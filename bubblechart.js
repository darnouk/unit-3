var svg = d3.select("svg");
var container = svg.append("g").attr("transform", "translate(50, 0)");

// Sample data
var cityPop = [
    { city: "Milwaukee", population: 594833.1111 }, // adding decimals to show how i can use d3.format("d") later on
    { city: "Madison", population: 233209.1111 },
    { city: "Green Bay", population: 104057.1111 },
    { city: "Superior", population: 27244.1111 },
    { city: "Appleton", population: 72686.1111 }
];

// Create scales
var x = d3.scaleLinear()
    .range([90, 500])
    .domain([0, cityPop.length - 1]);

var minPop = d3.min(cityPop, function(d) { return d.population; });
var maxPop = d3.max(cityPop, function(d) { return d.population; });

var y = d3.scaleLinear()
    .range([440, 95])
    .domain([minPop, maxPop]);

var color = d3.scaleLinear()
    .range(["#FDBE85", "#D94701"])
    .domain([minPop, maxPop]);

// Create bubbles
var bubbles = container.selectAll("circle")
    .data(cityPop)
    .enter()
    .append("circle")
    .attr("cx", function(d, i) { return x(i); })
    .attr("cy", function(d) { return y(d.population); })
    .attr("r", function(d) { return Math.sqrt(d.population * 0.01 / Math.PI); })
    .style("fill", function(d) { return color(d.population); })
    .style("stroke", "#000");

// Create title
var title = container.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", 450)
    .attr("y", 30)
    .text("City Populations");

// Create labels
var formatPopulation = d3.format(",d");
var labels = container.selectAll(".labels")
    .data(cityPop)
    .enter()
    .append("text")
    .attr("class", "labels")
    .attr("text-anchor", "left")
    .attr("x", function(d, i) { return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5; })
    .attr("y", function(d) { return y(d.population) + 5; })
    .text(function(d) { return d.city + ", Pop. " + formatPopulation(d.population); });

// Create Y Axis
var yAxis = d3.axisLeft(y);
var axis = container.append("g")
    .attr("class", "axis")
    .call(yAxis);
