$(function() {
    // Load data in using d3's json function.
    d3.csv('data/prepped_data.csv', function(error, data) {

        var measure = "fertility_rate";

        var nestedData = d3.nest()
            .key(function(d) {
                return d.region
            })
            .entries(data)

        var root = d3.hierarchy({
            values: nestedData
        }, function(d) {
            return d.values;
        }).sort(function(a,b) {
            return b.value - a.value;
        }).sum(function(d){
            return +d[measure];
        })

        // Define function to draw TreeMap
        var myChart = BubbleChart().colorValues(['South Asia', 'Europe & Central Asia', 'Middle East & North Africa', 'Latin America & Caribbean', 'East Asia & Pacific', 'Sub-Saharan Africa', 'North America']).colorBy('region').title('Circle Pack');

        // Function to make charts (doing a data-join to make charts)
        var draw = function() {
            // Create chart
            var chart = d3.select("#vis")
                .datum(root)
                .call(myChart);
            };

        // Call draw function
        draw();

    });
});
