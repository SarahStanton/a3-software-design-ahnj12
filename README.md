# Bubble Chart
---
This is a guide on how to setup and use BubbleChart.js. The purpose of BubbleChart.js is to quickly create bubble tree maps with hierarchical data.

##### Table of Contents
- [Initial Setup](#initial-setup)
- [Prepping Data](#prepping-data)
- [Api Reference](#api-reference)

## Initial Setup
---
1. Place BubbleChart.js in your project.
2. Reference the BubbleChart.js in the HTML.
3. Putting BubbleChart() in your javascript with initialize the bubble tree map.
4. BubbleChart() will return a function for you to use to build the chart.
5. Methods can be called on BubbleChart() to change its characteristics

## Prepping Data
---
1. Load in your data file and [nest](https://github.com/d3/d3-collection/blob/master/README.md#nest) the data. The key for the nest will be the property the data will be grouped by.
2. Transform the nested data into hierarchical data using [d3.hierarchy](https://github.com/d3/d3-hierarchy/blob/master/README.md#hierarchy). This will return you the root of the hier
3. Using the returned root, [sum](https://github.com/d3/d3-hierarchy/blob/master/README.md#node_sum) the values of the property you want to show up in the chart
4. The root can now be used as the datum for the data-join

## Api Reference
---

*Any method used without supplying a parameter will return the current value of the property*

##### .width(value)
value: *integer* <br>
Changes the width of the svg containing the chart to the given value

##### .height(value)
value: *integer* <br>
Changes the height of the svg containing the chart to the given value

##### .colorValues(values)
values: *array* <br>
Works together with the .colorBy() method. The values is an array that contains the values of the key nested in the data preperation. Sets the colors for each of the values in the array.

##### .colorBy(value)
value: *string* <br>
Works together with the .colorValues() method. The value is the property name of the values used in the .colorValues() method

##### .title(value)
value: *string* <br>
Sets the title of the chart to the given value.

##### .titleSize(value)
value: *integer* <br>
Sets the font size of the title to the given value.

##### .opacity(value)
value: *integer between 0 and 1* <br>
Sets the opacity of the bubbles to the given value.

##### .margins(values)
value: *Javascript Object* <br>
All the different sides of the margin can be set by including the corresponding field (top, bottom, left, right) in the object with the values being numbers. If any of the fields are not included, it will use the defaults or previously set margins.

##### .showLegend(value)
value: *boolean* <br>
Shows the legend for the chart if the value is true, otherwise hides it.

##### .bubbleScale(value)
value: *double* <br>
Multiplies the radius of each of the bubbles by the given value

##### .bubblePadding(value)
value: *integer/double* <br>
Sets the padding between the bubbles to the given value.



