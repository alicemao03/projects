const mapWidth = 1000;
const mapHeight = 500;

var countriesWithData = [
    "Andorra", "Argentina", "Australia", "Austria", "Belarus", "Belgium", "Bolivia",
    "Brazil", "Bulgaria", "Canada", "Chile", "Colombia", "Costa Rica", "Cyprus",
    "Czech Republic", "Denmark", "Dominican Republic", "Egypt", "El Salvador",
    "Estonia", "Finland", "France", "Germany", "Greece", "Guatemala", "Honduras",
    "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel",
    "Italy", "Japan", "Kazakhstan", "Korea", "Latvia", "Lithuania", "Luxembourg",
    "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nicaragua",
    "Nigeria", "Norway", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Romania", "Saudi Arabia", "Singapore", "Slovakia",
    "South Africa", "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand",
    "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Venezuela", "Vietnam"
];


var svg = d3.select("#geospatial-map")
    .append("svg")
    .attr("width", mapWidth)
    .attr("height", mapHeight)
    .attr("viewBox", "0 0 1000 350");

var g = svg.append("g");

var projection = d3.geoEquirectangular()
    .scale(mapWidth / (2 * Math.PI))
    .translate([mapWidth / 2, mapHeight / 2]);

var path = d3.geoPath().projection(projection);

var currentZoomLevel = 1;

var zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", function () {
        g.attr("transform", d3.event.transform);
        currentZoomLevel = d3.event.transform.k;
    });

svg.call(zoom)
    .on("wheel.zoom", null);

function zoomIn() {
    currentZoomLevel = Math.min(currentZoomLevel * 1.5, 8);
    zoomMap();
}

function zoomOut() {
    currentZoomLevel = Math.max(currentZoomLevel * 0.75, 1);
    zoomMap();
}

function zoomMap() {
    svg.transition()
        .duration(500)
        .call(zoom.scaleTo, currentZoomLevel);
}

d3.select("#zoom_in").on("click", zoomIn);
d3.select("#zoom_out").on("click", zoomOut);

var selectedChartOption = ""


var selectedCountryName = ""


updateMap();

function updateMap() {

    //https://raw.githubusercontent.com/janasayantan/datageojson/master/world.json
    d3.json("data/world.json", function (error, data) {
        g.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "black")
            .attr("d", path)
            .attr("fill", function(d) {
                // Check if the country has data
                if (countriesWithData.includes(d.properties.name)) {
                    return "#a1a1a1";
                } else {
                    return "#f2f3f4";
                }
            })
            .style("stroke", "#808080")
            .on("click", function (d) {
                var countryName = d.properties.name;
                selectedCountryName = ""
                console.log(selectedChartOption)
                if (selectedChartOption == "") {
                    document.getElementById("bubble-rank-selected").value = "Daily"
                } else {
                    document.getElementById("bubble-rank-selected").value = selectedChartOption;
                }
                document.getElementById("bubble-feature-selected").value = "ranking";
                document.getElementById("bubble-country-selected").value = "None";

                viral_top50_all_data.forEach(function (d) {
                    if (countryName == d[0].country) {
                        document.getElementById("bubble-country-selected").value = countryName;
                        selectedCountryName = countryName
                    }
                })
                highlightCountries()
                getPath()
            });
    });
}



function highlightCountries() {
    console.log("fill: " + selectedCountryName)
    svg.selectAll("path")
        .attr("fill", function (d) {
            if (d.properties.name === country1_selected) {
                return "blue";
            } else if (d.properties.name === country2_selected) {
                return "red";
            } else if (d.properties.name === selectedCountryName) {
                return "green";
            } else if (countriesWithData.includes(d.properties.name)) {
                return "#a1a1a1";
            } else {
                return "#f2f3f4";
            }
        });
}

