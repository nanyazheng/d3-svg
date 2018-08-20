// $.ajax({
//     method: "GET",
//     url: "https://baconipsum.com/api/?type=meat-and-filler",
//     dataType: "json"
// })
// .done(function(data) {
//     let width = 600;
//     let height = 600;
//     let tooltip = d3.select("body")
//                     .append("div")
//                     .classed("tooltip", true);
//     let svg = d3.select("svg")
//         .attr("height", height)
//         .attr("width", width);

//     let update = d3.selectAll("circle")
//                     .
//     svg
//         .selectAll("circle")  
//         .data(data)
//         .enter()
//         .append("circle")
//         .attr("cx", width / 2)
//         .attr('cy', height / 2)
//         .attr("r", 10)
//         .attr("fill", "black")
//         .on("mouseover", function(d) {
//             tooltip
//             .style("opacity", 1)
//             .style("left", d3.event.x + "px")
//             .style("top", d3.event.y + "px")
//             .html(`
//                 <p>Region: ${d}</p>
//             `)
//         })

// })
let width = 600;
let height = 600;
let padding = 50;
let xScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011, d => d.births / d.population))
                .range([padding, width - padding]);

let yScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
                .range([height - padding, 0 + padding]);

let colorScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, d => d.population / d.area))
                    .range(["lightgreen", "black"]);
let radiuScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, d => d.births))
                    .range([2, 40]);

let xAxis = d3.axisBottom(xScale)
                .tickSize(-height + 2 * padding)
                .tickSizeOuter(0);
let yAxis = d3.axisLeft(yScale)
                .tickSize(-width + 2 * padding)
                .tickSizeOuter(0);

let tooltip = d3.select("body")
                    .append("div")
                    .classed("tooltip", true);

d3.select("svg")
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - padding + 10)
    .attr("dy", "1.5em")
    .style("text-anchor", "middle")
    .text("Births per Captia")

d3.select("svg")
    .append("text")
    .attr("x", width / 2)
    .attr("y", padding)
    .style("text-anchor", "middle")
    .text("Data on births by country in 2011");

d3.select("svg")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", padding - 10)
    .attr("dy", "-1em")
    .style("text-anchor", "middle")
    .text("Life Expectancy")

d3.select("svg")
    .append("g")
    .attr("transform", "translate(0, " + (height - padding) + ")")
    .call(xAxis);

d3.select("svg")
    .append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(birthData2011)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.births / d.population))
    .attr("cy", d => yScale(d.lifeExpectancy))
    .attr("r", d => radiuScale(d.births))
    .attr("fill", d => colorScale(d.population / d.area))
    .on("mouseover", function(d) {
        tooltip
            .style("opacity", 1)
            .style("left", d3.event.x + "px")
            .style("top", d3.event.y + "px")
            .html(`
                <p>Region: ${d.region}</p>
                <p>LifeExpectancy: ${d.lifeExpectancy} </p>
            `)
    })
    .on("mouseout", () => {
        tooltip
            .style("opacity", 0);
    })

