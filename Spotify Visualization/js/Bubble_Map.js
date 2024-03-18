const width = 900;
const height = 450;

var bubbleSvg = d3.select("#bubble-map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("stroke", "outline: solid black;")
    .attr("viewBox", "0 0 900 500")

var selectCountry = " "
var selectFeature = " "
var selectRank = " "


function getPath() {

    selectRank = document.getElementById("bubble-rank-selected");
    selectRank = selectRank.options[selectRank.selectedIndex].value;

    selectFeature = document.getElementById("bubble-feature-selected");
    selectFeature = selectFeature.options[selectFeature.selectedIndex].value;

    selectCountry = document.getElementById("bubble-country-selected");
    selectCountry = selectCountry.options[selectCountry.selectedIndex].value;
    selectedCountryName = selectCountry
    highlightCountries()

    console.log(selectCountry + " " + selectFeature)

    var data;
    if (selectRank == "Daily") { data = daily_top50_all_data }
    else if (selectRank == "Weekly") { data = weekly_top50_all_data }
    else if (selectRank == "Viral") { data = viral_top50_all_data }


    var currData = []
    data.forEach(function (d) {
        if (d[0].country == selectCountry) {
            currData.push(d)
        }
    })

    updateVis(currData[0])
}

function updateVis(data) {
    console.log("update vis")
    console.log(data)
    bubbleSvg.selectAll("*").remove();
    if (selectFeature == "None" || selectCountry == "None") {
        document.getElementById("instructions").style.display = "block"
    } else {
        var bar_labels = ["Popularity", "Ranking", "Danceability", "Energy", "Key", "Mode", "Speechiness", "Acousticness", "Instrumentalness", "Liveness", "Valence", "Tempo"];
        var labe_strs = ["A measure of how popular each song is",
            "Where each song is ranked",
            "A measure of how suitable the song is for dancing based on various musical elements.",
            "A measure of the intensity and activity level of the song.",
            "The key of the song.",
            "Indicates whether the song is in amajor or minor key.",
            "A measure of the presence of spoken words in the song.",
            "A measure of the acoustic quality of the song.",
            "A measure of the likelihood that the song does not contain vocals.",
            "A measure of the presence of a live audience in the recording.",
            "A measure of the musical positiveness conveyed by the song.",
            "The tempo of the song in beats per minute.",
        ];
        var selectFeatureC = selectFeature.charAt(0).toUpperCase() + selectFeature.slice(1)
        var i = bar_labels.indexOf(selectFeatureC)
        document.getElementById("instructions").innerHTML = "<b>" + selectFeatureC + ":</b> " + labe_strs[i]

        var rankingScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.ranking; }), d3.max(data, function (d) { return d.ranking; })])
            .range(["#1DB954", "white"]);

        var acousticScaled = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.acousticness; }), d3.max(data, function (d) { return d.acousticness; })])
            .range(["#1DB954", "white"]);

        var danceabilityScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.danceability; }), d3.max(data, function (d) { return d.danceability; })])
            .range(["#1DB954", "white"]);

        var energyScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.energy; }), d3.max(data, function (d) { return d.energy; })])
            .range(["#1DB954", "white"]);

        var instrumentalScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.instrumentalness; }), d3.max(data, function (d) { return d.instrumentalness; })])
            .range(["#1DB954", "white"]);

        var keyScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.key; }), d3.max(data, function (d) { return d.key; })])
            .range(["#1DB954", "white"]);

        var livenessScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.liveness; }), d3.max(data, function (d) { return d.liveness; })])
            .range(["#1DB954", "white"]);

        var modeScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.mode; }), d3.max(data, function (d) { return d.mode; })])
            .range(["#1DB954", "white"]);

        var popularityScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.popularity; }), d3.max(data, function (d) { return d.popularity; })])
            .range(["#1DB954", "white"]);

        var speechinessScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.speechiness; }), d3.max(data, function (d) { return d.speechiness; })])
            .range(["#1DB954", "white"]);

        var tempoScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.tempo; }), d3.max(data, function (d) { return d.tempo; })])
            .range(["#1DB954", "white"]);

        var valenceScale = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.valence; }), d3.max(data, function (d) { return d.valence; })])
            .range(["#1DB954", "white"]);

        //for reference:https://github.com/Caged/d3-tip
        //Use this tool tip element to handle any hover over the chart
        tip = d3.tip().attr('class', 'd3-tip')
            .direction('s')
            .offset(function () {
                return [0, 0];
            })
            .html(function (d) {
                return tooltip_render(d);
            });

        var images = bubbleSvg.append("g").attr("class", "images")

        if (selectFeature == "ranking") {
            var chart = images.selectAll("rect")
                .data(data, function (d) { return d })

            chart.enter()
                .append("rect")
                .attr("class", "songRects")
                .merge(chart)
                .attr("x", function (d) {
                    return (d.ranking - 1) % 10 * (height - 20) / 5
                })
                .attr("y", function (d) {
                    if (d.ranking >= 41) {
                        return 4 * (width - 10) / 10
                    } else if (d.ranking >= 31) {
                        return 3 * (width - 10) / 10
                    } else if (d.ranking >= 21) {
                        return 2 * (width - 10) / 10
                    } else if (d.ranking >= 11) {
                        return (width - 10) / 10
                    }
                    return 0
                })
                .attr("height", function (d) { return (width - 10) / 10 })
                .attr("width", function (d) { return (height - 20) / 5 })
                .attr("fill", "black")
                .style("stroke", "black")
                .style("opacity", 1)
            // .call(tip)
            // .on('mouseover', tip.show)
            // .on('mouseout', tip.hide)

        }

        images.selectAll("images")
            .data(data, function (d) { return d })
            .enter()
            .append("a")
            .attr("xlink:href", d => d.album_url)
            .attr("target", "_blank")
            .append("image")
            .attr("xlink:href", d => d.album_cover)
            .attr("height", (width - 10) / 10)
            .attr("width", (height - 20) / 5)
            .attr("x", d => (d.ranking - 1) % 10 * (height - 20) / 5)
            .attr("y", function (d) {
                if (d.ranking >= 41) {
                    return 4 * (width - 10) / 10
                } else if (d.ranking >= 31) {
                    return 3 * (width - 10) / 10
                } else if (d.ranking >= 21) {
                    return 2 * (width - 10) / 10
                } else if (d.ranking >= 11) {
                    return (width - 10) / 10
                }
                return 0
            })
            .style("opacity", 0.6)
            .call(tip)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)



        images.exit().remove()

        var squarGrouping = bubbleSvg.append("g").attr("class", "square-grouping")
        var chart = squarGrouping.selectAll("rect")
            .data(data, function (d) { return d })

        chart.enter()
            .append("rect")
            .attr("class", "songRects")
            .merge(chart)
            .attr("x", function (d) {
                return (d.ranking - 1) % 10 * (height - 20) / 5
            })
            .attr("y", function (d) {
                if (d.ranking >= 41) {
                    return 4 * (width - 10) / 10
                } else if (d.ranking >= 31) {
                    return 3 * (width - 10) / 10
                } else if (d.ranking >= 21) {
                    return 2 * (width - 10) / 10
                } else if (d.ranking >= 11) {
                    return (width - 10) / 10
                }
                return 0
            })
            .attr("height", function (d) { return (width - 10) / 10 })
            .attr("width", function (d) { return (height - 20) / 5 })
            .attr("fill", function (d, i) {
                if (selectFeature == "ranking") {
                    return "url(#img_1)"
                } else if (selectFeature == "danceability") {
                    return danceabilityScale(d.danceability)
                } else if (selectFeature == "energy") {
                    return energyScale(d.energy)
                } else if (selectFeature == "popularity") {
                    return popularityScale(d.popularity)
                } else if (selectFeature == "acousticness") {
                    return acousticScaled(d.acousticness)
                } else if (selectFeature == "key") {
                    return keyScale(d.key)
                } else if (selectFeature == "instrumentalness") {
                    return instrumentalScale(d.instrumentalness)
                } else if (selectFeature == "liveness") {
                    return livenessScale(d.liveness)
                } else if (selectFeature == "mode") {
                    return modeScale(d.mode)
                } else if (selectFeature == "speechiness") {
                    return speechinessScale(d.speechiness)
                } else if (selectFeature == "tempo") {
                    return tempoScale(d.tempo)
                } else if (selectFeature == "valence") {
                    return valenceScale(d.valence)
                } else if (selectFeature == "explicit") {
                    if (d.explicit) { return "white" }
                    else { return "#1DB954" }
                }
                return "black"
            })
            .style("stroke", "black")
            .call(tip)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

        chart.exit().remove()



        var numberingGroup = bubbleSvg.append("g").attr("class", "song-numbering")
        var labeling = numberingGroup.selectAll("text")
            .data(data, function (d) { return d })

        labeling.enter()
            .append("text")
            .text(function (d) {
                return d.ranking
            })
            .attr("class", "ranking")
            .merge(labeling)
            .attr("x", function (d) {
                return (d.ranking - 1) % 10 * (height - 20) / 5 + 42
            })
            .attr("y", function (d) {
                if (d.ranking >= 41) {
                    return 4 * (width - 10) / 10 + (height - 20) / 5 / 2 + 10
                } else if (d.ranking >= 31) {
                    return 3 * (width - 10) / 10 + (height - 20) / 5 / 2 + 10
                } else if (d.ranking >= 21) {
                    return 2 * (width - 10) / 10 + (height - 20) / 5 / 2 + 10
                } else if (d.ranking >= 11) {
                    return (width - 10) / 10 + (height - 20) / 5 / 2 + 10
                }
                return 0 + (height - 20) / 5 / 2 + 10
            })
            .style("fill", function (d) {
                if (selectFeature == "ranking") {
                    return "white"
                }
                return "black"
            })
            .style("font-size", "34px")
            .style("text-anchor", "middle")
            .call(tip)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
        labeling.exit().remove()


        // code to create a gradient https://www.visualcinnamon.com/2016/05/smooth-color-legend-d3-svg-gradient/
        //Append a defs (for definition) element to your SVG
        var defs = bubbleSvg.append("defs");

        //Append a linearGradient element to the defs and give it a unique id
        var linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient");

        linearGradient
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");


        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#1DB954");

        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "white");


        var legendGroup = bubbleSvg.append("g").attr("class", "legendGroup")

        if (selectFeature != "ranking") {
            legendGroup.append("rect")
                .attr("x", 30)
                .attr("y", height + 10)
                .attr("width", width - 100)
                .attr("height", 15)
                .style("fill", "url(#linear-gradient)")

            legendGroup.append("path")
                .attr("d", "M30 483 L30 453")
                .style("stroke", "black")

            legendGroup.append("path")
                .attr("d", "M831 483 L831 453")
                .style("stroke", "black")

            legendGroup.append("text")
                .text(d3.min(data, function (d) { return d[selectFeature]; }))
                .attr("x", 30)
                .attr("y", 497)
                .style("text-anchor", "middle")
                .style("font", "14px times")
                .attr("class", "legendBounds")

            legendGroup.append("text")
                .text(d3.max(data, function (d) { return d[selectFeature]; }))
                .attr("x", 831)
                .attr("y", 497)
                .style("text-anchor", "middle")
                .style("font", "14px times")
                .attr("class", "legendBounds")
        }
    }
}

function tooltip_render(tooltip_data) {
    var text = "<div class='heat-map-hover'><div class='song-name'>" + tooltip_data.name + "</div><br>"
    text += "<span class='category-name'>Artist: <\span><span class='description'>" + tooltip_data.artist_name + "</span><br>"
    text += "<span class='category-name'>" + selectFeature + ": <\span><span class='description'>" + tooltip_data[selectFeature] + "</span><br>"
    text += "<\div>"
    return text;
}
