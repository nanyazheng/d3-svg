let minYear = birthData[0].year;
let maxYear = birthData[birthData.length - 1].year;
let width = 600;
let height = 600;
let barPadding = 10;
let barNums = 12;
let barWidth = width / barNums - barPadding;

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
            return d.births / 2.5e6 * height;
        })
        .attr("x", function(d, i) {
            return (barPadding + barWidth) * i;
        })
        .attr("y", function(d) {
            return height - d.births / 2.5e6 * height;
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
                return d.births / 2.5e6 * height;
            })
            .attr("y", function(d, i) {
                return height - d.births / 2.5e6 * height;
            })
        d3.select("h2")
            .text("The births in " + year);
    })