const width = 800;
const height = 800;
const padding = 50;
const barPadding = 1;
const initialBinCount = 16;
let ageData = regionData.filter(d => d.medianAge !== null);

let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
svg.append("g")
    .attr("transform", `translate(0, ${height - padding})`)
    .classed("x-axis", true)

svg.append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .classed("y-axis", true)

svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .style("text-anchor", "middle")
    .text("Median Age")

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .text("Frequency")

updateRects(initialBinCount);

d3.select("input")
    .property("value", initialBinCount)
    .on("input", function () {
        updateRects(+d3.event.target.value);
    })
    
function updateRects(val) {
    let xScale = d3.scaleLinear()
        .domain(d3.extent(ageData, d => d.medianAge))
        .rangeRound([padding, width - padding]);
    let histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(val))
        .value(d => d.medianAge)
    let bins = histogram(ageData);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .rangeRound([height - padding, padding])
    let binCount = val;
    histogram.thresholds(xScale.ticks(binCount));
    bins = histogram(ageData);
    yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([height - padding, padding])

    d3.select(".x-axis")
        .call(d3.axisBottom(xScale).ticks(val))
        .selectAll("text")
        .attr("x", 10)
        .attr("y", -3)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start")
    d3.select(".y-axis")
        .call(d3.axisLeft(yScale))

    d3.select(".bin-count")
        .text(`Number of bins: ${binCount}`);

    let rect = svg.selectAll("rect")
        .data(bins)

    rect.exit().remove()
    rect.enter()
        .append("rect")
        .merge(rect)
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0) - barPadding)
        .attr("height", d => height - yScale(d.length) - padding)
        .attr("fill", "#9c27b0")
}