// write your code here!
let width = 600;
let height = 600;
let padding = 50;

let data = regionData.filter(mustHaveKeys);

let xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.adultLiteracyRate))
                .range([padding, width - padding])

let yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.subscribersPer100))
                .range([height - padding, padding])

let radiusScale = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.medianAge))
                    .range([2, 40])

let colorScale = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.urbanPopulationRate))
                    .range(["green", "blue"])

let xAxis = d3.axisBottom(xScale)
                .tickSize(-height + 2 * padding)
                .tickSizeOuter(0)

let yAxis = d3.axisLeft(yScale)
                .tickSize(-width + 2 * padding)
                .tickSizeOuter(0)

let svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height)

svg
    .append("g")
    .attr("transform", "translate(0, " + (height - padding) + ")")
    .call(xAxis)

svg
    .append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis)

svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - padding)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Literacy Rate, Age 15 and up")

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Cellular Subscriptions per 100 people")    

svg
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.adultLiteracyRate))
    .attr("cy", d => yScale(d.subscribersPer100))
    .attr("r", d => radiusScale(d.medianAge))
    .attr("fill", d => colorScale(d.urbanPopulationRate))
    .attr("stroke", "#fff")

function mustHaveKeys(obj) {
    let keys = [
        "adultLiteracyRate",
        "subscribersPer100",
        "medianAge",
        "urbanPopulationRate"
    ];
    for (let i = 0; i < keys.length; i++) {
        if (!obj[keys[i]]) {
            return false;
        }
    }
    return true;
}