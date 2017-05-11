// Bubble Chart
var BubbleChart = function() {
    // Set default values
    var height = 500,
        width = 500,
        title = 'Chart title',
        bubblePadding = 1.5,
        colorValues = null,
        colorBy = null,
        opacity = 1,
        margin = {
            left: 70,
            bottom: 10,
            top: 15,
            right: 10
        },
        showLegend = true,
        titleSize = 16,
        bubbleScale = 1;

    // Function returned by BubbleChart
    var chart = function(selection) {
        var pack = d3.pack()
            .size([width - margin.left, height - margin.top])
            .padding(bubblePadding);

        var colorScale = d3.scaleOrdinal().domain(colorValues).range(d3.schemeCategory10);

        // Iterate through selections, in case there are multiple
        selection.each(function(data) {
            var root = data;

            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([root]);

            // Append static elements (i.e., only added once)
            var svgEnter = svg.enter()
                .append("svg")
                .attr('width', width)
                .attr("height", height);

            svgEnter.append('text')
                .attr('transform', 'translate(' + ((width / 2) - margin.left) + ',' + 30 + ')')
                .text(title)
                .attr('class', 'chart-title')
                .style('font-size', titleSize)
                .attr('text-anchor', 'middle');

            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr("class", 'chartG');

            pack(root);

            var nodes = ele.select('.chartG').selectAll('.node').data(root.leaves());

            nodes.enter()
                .append('circle')
                .merge(nodes)
                .attr('class', 'node')
                .transition()
                .duration(1500)
                .attr('r', function (d) { return d.r * bubbleScale; })
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y;})
                .attr('fill', function (d)
                {
                    if (colorValues && colorBy)
                    {
                        return colorScale(d.data[colorBy]);
                    }
                    else
                    {
                        return 'black'
                    }
                })
                .attr('opacity', opacity);

            // Only show label if they have also provided color values and color by
            if (colorValues && colorBy && showLegend)
            {
                var legend = svgEnter.append('g')
                    .attr('id', 'legend')
                    .attr('transform', 'translate(10,' + (margin.top + 30) + ')');

                var texts = legend.selectAll('text')
                    .data(colorValues);

                texts.enter()
                    .append('text')
                    .merge(texts)
                    .style('opacity', 0)
                    .transition()
                    .duration(1500)
                    .style('opacity', 1)
                    .text(function (d)
                    {
                        return d;
                    })
                    .attr('x', '1em')
                    .attr('y', function (d, i)
                    {
                        return i + 'em';
                    })
                    .style('padding-bottom', '0.1em');

                var circles = legend.selectAll('circle')
                    .data(colorValues);

                circles.enter()
                    .append('circle')
                    .merge(circles)
                    .style('fill', 'white')
                    .transition()
                    .duration(1500)
                    .attr('cy', function (d, i)
                    {
                        return i - 0.35 + 'em';
                    })
                    .attr('cx', 0)
                    .attr('r', '0.4em')
                    .style('fill', function (d)
                    {
                        return colorScale(d)
                    })
                    .style('padding-bottom', '0.1em');

                texts.exit().remove()
                circles.exit().remove();
            }

            nodes.exit().remove();
        });
    };

    // Getter/setter methods to change locally scoped options
    chart.height = function (value)
    {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.width = function (value)
    {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.colorValues = function(values)
    {
        if (!arguments.length) return colorValues;
        colorValues = values;
        return chart;
    };

    chart.colorBy = function (value)
    {
        if (!arguments.length) return colorBy;
        colorBy = value;
        return chart;
    };

    chart.title = function (value)
    {
        if (!arguments.length) return title;
        title = value;
        return chart;
    };

    chart.titleSize = function (value)
    {
        if (!arguments.length) return titleSize;
        titleSize = value;
        return chart;
    };

    chart.opacity = function (value)
    {
        if (!arguments.length) return opacity;
        opacity = value;
        return chart;
    };

    chart.margins = function (values)
    {
        if (!arguments.length) return margin;
        margin.top = values.top || margin.top;
        margin.left = values.left || margin.left;
        margin.bottom = values.bottom || margin.bottom;
        margin.right = values.right || margin.right;
        return chart;
    };

    chart.showLegend = function (value)
    {
        if (!arguments.length) return showLegend;
        showLegend = value;
        return chart;
    };

    chart.bubbleScale = function (value)
    {
        if (!arguments.length) return bubbleScale;
        bubbleScale = value;
        return chart;
    };

    chart.bubblePadding = function (value)
    {
        if (!arguments.length) return bubblePadding;
        bubblePadding = value;
        return chart;
    };

    return chart;
};