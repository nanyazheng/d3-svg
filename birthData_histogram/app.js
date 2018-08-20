// let minYear = birthData[0].year;
// let maxYear = birthData[birthData.length - 1].year;
let minYear = d3.min(birthData, function(d) {
    return d.year;
})
let maxYear = d3.max(birthData, function(d) {
    return d.year;
})
let width = 600;
let height = 600;
let barPadding = 10;
let barNums = 12;
let barWidth = width / barNums - barPadding;
let maxBirths = d3.max(birthData, function(d) {
    return d.births;
})
let yScale = d3.scaleLinear()
                .domain([0, maxBirths])
                .range([height, 0])

d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("rect")
    .data(birthData.filter(function(d) {
        return d.year === minYear;
    }))
    .enter().append("rect")
        .attr("width", barWidth)
        .attr("height", function(d) {
            //return d.births / maxBirths * height;
            return height - yScale(d.births);
        })
        .attr("x", function(d, i) {
            return (barPadding + barWidth) * i;
        })
        .attr("y", function(d) {
            return yScale(d.births);
        })
    .attr("fill", "#9090ff");

d3.select("h2")
    .text("The births in " + minYear);

d3.select("input")
    .on("input", function() {
        let year = +d3.event.target.value;
        d3.selectAll("rect")
            .data(birthData.filter(function(d) {
                return d.year === year;
            }))
            .attr("height", function(d) {
                return height - yScale(d.births);
            })
            .attr("y", function(d, i) {
                return yScale(d.births);
            })
        d3.select("h2")
            .text("The births in " + year);
    })