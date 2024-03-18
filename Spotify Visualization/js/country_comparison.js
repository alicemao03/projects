var daily_top50_all_data;
var weekly_top50_all_data;
var viral_top50_all_data;
var country1_selected = '';
var country2_selected = '';

var country1Data;
var country2Data;


var chartWidth = 450;

var chartHeight = 400;

updateChart("Daily")

function updateChart(option) {
    if (option === 'Daily') {
        var selectElement = document.getElementById("firstCountry");
        selectElement.innerHTML = "";
        var optionElement = document.createElement("option");
        optionElement.text = 'Country 1';
        optionElement.value = '';
        selectElement.appendChild(optionElement);

        var selectElement2 = document.getElementById("secondCountry");
        selectElement2.innerHTML = "";
        var optionElement2 = document.createElement("option");
        optionElement2.text = 'Country 2';
        optionElement2.value = '';
        selectElement2.appendChild(optionElement2);

        daily_top50_all_data.forEach(countryDataArray => {
            var countryName = countryDataArray[0]["country"];
            var optionElement = document.createElement("option");
            optionElement.text = countryName;
            optionElement.value = countryName;
            selectElement.appendChild(optionElement);

            var optionElement2 = document.createElement("option");
            optionElement2.text = countryName;
            optionElement2.value = countryName;
            selectElement2.appendChild(optionElement2);
        });

    } else if (option === 'Weekly') {
        var selectElement = document.getElementById("firstCountry");
        selectElement.innerHTML = "";
        var optionElement = document.createElement("option");
        optionElement.text = 'Country 1';
        optionElement.value = '';
        selectElement.appendChild(optionElement);
        console.log(optionElement)

        var selectElement2 = document.getElementById("secondCountry");
        selectElement2.innerHTML = "";
        var optionElement2 = document.createElement("option");
        optionElement2.text = 'Country 2';
        optionElement2.value = '';
        selectElement2.appendChild(optionElement2);

        weekly_top50_all_data.forEach(countryDataArray => {
            var countryName = countryDataArray[0]["country"];
            var optionElement = document.createElement("option");
            optionElement.text = countryName;
            optionElement.value = countryName;
            selectElement.appendChild(optionElement);

            var optionElement2 = document.createElement("option");
            optionElement2.text = countryName;
            optionElement2.value = countryName;
            selectElement2.appendChild(optionElement2);
        });

    } else if (option === 'Viral') {

        var selectElement = document.getElementById("firstCountry");
        selectElement.innerHTML = "";
        var optionElement = document.createElement("option");
        optionElement.text = 'Country 1';
        optionElement.value = '';
        selectElement.appendChild(optionElement);

        var selectElement2 = document.getElementById("secondCountry");
        selectElement2.innerHTML = "";
        var optionElement2 = document.createElement("option");
        optionElement2.text = 'Country 2';
        optionElement2.value = '';
        selectElement2.appendChild(optionElement2);

        viral_top50_all_data.forEach(countryDataArray => {
            var countryName = countryDataArray[0]["country"];
            var optionElement = document.createElement("option");
            optionElement.text = countryName;
            optionElement.value = countryName;
            selectElement.appendChild(optionElement);

            var optionElement2 = document.createElement("option");
            optionElement2.text = countryName;
            optionElement2.value = countryName;
            selectElement2.appendChild(optionElement2);
        });

    }
}


function initialize_country() {
    var selectElement = document.getElementById("firstCountry");
    selectElement.innerHTML = "";
    var optionElement = document.createElement("option");
    optionElement.text = '';
    optionElement.value = '';
    selectElement.appendChild(optionElement);

    var selectElement2 = document.getElementById("secondCountry");
    selectElement2.innerHTML = "";
    var optionElement2 = document.createElement("option");
    optionElement2.text = '';
    optionElement2.value = '';
    selectElement2.appendChild(optionElement2);

    daily_top50_all_data.forEach(countryDataArray => {
        var countryName = countryDataArray[0]["country"];
        var optionElement = document.createElement("option");
        optionElement.text = countryName;
        optionElement.value = countryName;
        selectElement.appendChild(optionElement);

        var optionElement2 = document.createElement("option");
        optionElement2.text = countryName;
        optionElement2.value = countryName;
        selectElement2.appendChild(optionElement2);
    });
}

function updateTop(option) {
    console.log('Selected Top Option:', option);
}

function updateCountry(countryType, selectedCountry) {
    console.log(`Selected ${countryType}:`, selectedCountry);
    if (countryType === 'firstCountry') {
        // document.getElementById('firstCountryLabel').textContent = selectedCountry;
        country1_selected = selectedCountry;
    } else if (countryType === 'secondCountry') {
        // document.getElementById('secondCountryLabel').textContent = selectedCountry;
        country2_selected = selectedCountry;
    }
    highlightCountries();
    compare_country();
}
var selectedChartOption = null;
function compare_country() {

    var radioButtons = document.getElementsByName('chartOption');


    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedChartOption = radioButtons[i].value;
            break;
        }
    }

    var topOptionRadioButtons = document.getElementsByName('topOption');
    var selectedTopOption = "Top50";

    // for (var i = 0; i < topOptionRadioButtons.length; i++) {
    //     if (topOptionRadioButtons[i].checked) {
    //         // selectedTopOption = topOptionRadioButtons[i].value;
    //         selectedTopOption = "Top50"
    //         break;
    //     }
    // }

    if (country1_selected === '' || country2_selected === '') {
        // alert("Please select two countries");
        return;
    }

    console.log(`Compare country:`, selectedChartOption, selectedTopOption, country1_selected, country2_selected);

    // get data for selected country 1
    var country1_data = getCountrySongData(selectedChartOption, selectedTopOption, country1_selected);
    // get data for selected country 2
    var country2_data = getCountrySongData(selectedChartOption, selectedTopOption, country2_selected);


    country1Data = country1_data;
    country2Data = country2_data;

    var table = document.getElementById('song_data_table');

    // Clear previous data and chart
    // while (table.rows.length > 2) {
    //     table.deleteRow(2);
    // }
    // clear previous chart
    d3.select("#song_chart").selectAll("*").remove();

    //filling the table
    // update_compare_table(country1_data, country2_data)
    //update the funnel chart
    update_visualization_chart(country1_data, country2_data)
}

//get country data
function getCountrySongData(selectedChartOption, selectedTopOption, country_selected) {
    var sumObject = {
        danceability: 0,
        energy: 0,
        key: 0,
        mode: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        liveness: 0,
        valence: 0,
        tempo: 0,
        albums: [],
        artists: []
    };

    var countryData = [];
    var dataSource;
    if (selectedChartOption === 'Daily') {
        dataSource = daily_top50_all_data;
    } else if (selectedChartOption === 'Weekly') {
        dataSource = weekly_top50_all_data;
    } else if (selectedChartOption === 'Viral') {
        dataSource = viral_top50_all_data;
    } else {
        console.log("Error: Invalid chart option");
        return sumObject;
    }

    // Filter data for the selected country and top option
    dataSource.forEach(countryDataArray => {
        var countryName = countryDataArray[0]["country"];
        if (countryName === country_selected) {
            countryData = countryDataArray.filter(songData =>
                (selectedTopOption === "Top10" && songData.ranking <= 10) ||
                (selectedTopOption === "Top20" && songData.ranking <= 20) ||
                (selectedTopOption === "Top50" && songData.ranking <= 50)
            );
        }
    });

    // Aggregate data and collect additional info
    countryData.forEach(songData => {
        updateSumObject(sumObject, songData);

        // Collect album info
        if (songData.album_cover && songData.album_name) {
            sumObject.albums.push({
                cover: songData.album_cover,
                name: songData.album_name,
                releaseDate: songData.album_release_date,
                url: songData.album_url
            });
        }

        // Collect artist info
        if (songData.artist_name && songData.artist_url) {
            sumObject.artists.push({
                name: songData.artist_name,
                url: songData.artist_url
            });
        }
    });

    return sumObject;
}

function updateSumObject(sumObject, songData) {
    sumObject.danceability += songData.danceability || 0;
    sumObject.energy += songData.energy || 0;
    sumObject.key += songData.key || 0;
    sumObject.mode += songData.mode || 0;
    sumObject.speechiness += songData.speechiness || 0;
    sumObject.acousticness += songData.acousticness || 0;
    sumObject.instrumentalness += songData.instrumentalness || 0;
    sumObject.liveness += songData.liveness || 0;
    sumObject.valence += songData.valence || 0;
    sumObject.tempo += songData.tempo || 0;
}

function update_compare_table(country1_data, country2_data) {
    console.log(country1_data);
    console.log(country2_data);

    var table = document.querySelector('table');
    for (var metric in country1_data) {
        if (country1_data.hasOwnProperty(metric) && metric !== 'albums' && metric !== 'artists') {
            // Create a new row for each metric except 'albums' and 'artists'
            var row = table.insertRow();

            // Create cells in the row
            var firstCountryMetricCell = row.insertCell(0);
            var nameCell = row.insertCell(1);
            var secondCountryMetricCell = row.insertCell(2);

            // Populate the cells with data
            firstCountryMetricCell.textContent = ((country1_data[metric] / (country1_data[metric] + country2_data[metric])) * 100).toFixed(2);
            nameCell.textContent = metric;
            secondCountryMetricCell.textContent = ((country2_data[metric] / (country1_data[metric] + country2_data[metric])) * 100).toFixed(2);
        }
    }

    // Handling albums and artists
    addTopAlbumOrArtistRow('Top Album', country1_data.albums, country2_data.albums, 'name');
    addTopAlbumOrArtistRow('Top Artist', country1_data.artists, country2_data.artists, 'name');
}

function addTopAlbumOrArtistRow(label, country1Items, country2Items, propertyToDisplay) {
    var row = document.querySelector('table').insertRow();
    var firstCountryCell = row.insertCell(0);
    var labelCell = row.insertCell(1);
    var secondCountryCell = row.insertCell(2);

    labelCell.textContent = label;

    firstCountryCell.textContent = country1Items && country1Items.length > 0 ? country1Items[0][propertyToDisplay] : 'N/A';
    secondCountryCell.textContent = country2Items && country2Items.length > 0 ? country2Items[0][propertyToDisplay] : 'N/A';
}

function update_visualization_chart(country1_data, country2_data) {
    var svg = d3.select("#song_chart")
        .append("svg")
        .attr("width", 600)
        .attr("height", 500)
        .attr("transform", "translate(-25, 0)")
        .attr("viewBox", "0 0 550 400");

    var compare_data_left = [];
    var compare_data_right = [];

    compare_data_left[0] = (country1_data.danceability / (country1_data.danceability + country2_data.danceability)) * 100;
    compare_data_right[0] = (country2_data.danceability / (country1_data.danceability + country2_data.danceability)) * 100;

    compare_data_left[1] = (country1_data.energy / (country1_data.energy + country2_data.energy)) * 100;
    compare_data_right[1] = (country2_data.energy / (country1_data.energy + country2_data.energy)) * 100;

    compare_data_left[2] = (country1_data.key / (country1_data.key + country2_data.key)) * 100;
    compare_data_right[2] = (country2_data.key / (country1_data.key + country2_data.key)) * 100;

    compare_data_left[3] = (country1_data.mode / (country1_data.mode + country2_data.mode)) * 100;
    compare_data_right[3] = (country2_data.mode / (country1_data.mode + country2_data.mode)) * 100;

    compare_data_left[4] = (country1_data.speechiness / (country1_data.speechiness + country2_data.speechiness)) * 100;
    compare_data_right[4] = (country2_data.speechiness / (country1_data.speechiness + country2_data.speechiness)) * 100;

    compare_data_left[5] = (country1_data.acousticness / (country1_data.acousticness + country2_data.acousticness)) * 100;
    compare_data_right[5] = (country2_data.acousticness / (country1_data.acousticness + country2_data.acousticness)) * 100;

    compare_data_left[6] = (country1_data.instrumentalness / (country1_data.instrumentalness + country2_data.instrumentalness)) * 100;
    compare_data_right[6] = (country2_data.instrumentalness / (country1_data.instrumentalness + country2_data.instrumentalness)) * 100;

    compare_data_left[7] = (country1_data.liveness / (country1_data.liveness + country2_data.liveness)) * 100;
    compare_data_right[7] = (country2_data.liveness / (country1_data.liveness + country2_data.liveness)) * 100;

    compare_data_left[8] = (country1_data.valence / (country1_data.valence + country2_data.valence)) * 100;
    compare_data_right[8] = (country2_data.valence / (country1_data.valence + country2_data.valence)) * 100;

    compare_data_left[9] = (country1_data.tempo / (country1_data.tempo + country2_data.tempo)) * 100;
    compare_data_right[9] = (country2_data.tempo / (country1_data.tempo + country2_data.tempo)) * 100;

    var data2 = compare_data_right;
    var data1 = compare_data_left;

    var yScale = d3.scaleBand()
        .domain(d3.range(data1.length))
        .range([0, chartHeight])
        .padding(0.1);

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data1.concat(data2), function (d) { return d; }) + 10])
        .range([0, chartWidth / 2 - 20]);

    var bar_labels = ["Danceability", "Energy", "Key", "Mode", "Speechiness", "Acousticness", "Instrumentalness", "Liveness", "Valence", "Tempo"];
    var labe_strs = ["A measure of how suitable the song is for dancing based on various musical elements.",
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

    // First Bar Chart (Positive X-direction)
    svg.selectAll(".bar1")
        .data(data1)
        .enter()
        .append("path")
        .attr("class", "bar1")
        .attr("fill", "#3a48f1")
        .attr("d", function (d, i) {
            return rounded_rect(chartWidth / 2 - xScale(d), yScale(i),
                xScale(d), yScale.bandwidth(), 16, true, false, true, false);
        })

    svg.selectAll(".myText1")
        .data(data1)
        .enter()
        .append("text")
        .attr("class", "myText1")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .attr("x", function (d) { return chartWidth / 2 - xScale(d) + 15; })
        .attr("y", function (d, i) { return yScale(i) + 22; })
        .text(d => parseInt(d))
        .attr("fill", "#ffffff");

    // Separator Line
    svg.append("line")
        .attr("x1", chartWidth / 2)
        .attr("y1", 0)
        .attr("x2", chartWidth / 2)
        .attr("y2", chartHeight)
        .style("stroke", "black")
        .style("stroke-width", 2);

    // Second Bar Chart (Negative X-direction)
    svg.selectAll(".bar2")
        .data(data2)
        .enter()
        .append("path")
        .attr("class", "bar2")
        .attr("fill", "#f2624e")
        .attr("d", function (d, i) {
            return rounded_rect(chartWidth / 2,
                yScale(i), xScale(d), yScale.bandwidth(), 16
                , false, true, false, true
            );
        })
    // .append("rect")
    // .attr("class", "bar2")
    // .attr("x", chartWidth / 2) // Adjusted x-attribute
    // .attr("y", function (d, i) { return yScale(i); })
    // .attr("width", function (d) { return xScale(d); })
    // .attr("height", yScale.bandwidth())
    // .attr("fill", "#f2624e")

    svg.selectAll(".myText2")
        .data(data2)
        .enter()
        .append("text")
        .attr("class", "myText2")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .attr("x", function (d) { return chartWidth / 2 + xScale(d) - 15; })
        .attr("y", function (d, i) { return yScale(i) + 22; })
        .text(d => parseInt(d))
        .attr("fill", "#ffffff");

    // ----------------
    // Create a tooltip
    // ----------------
    var tooltip = d3.select("#song_chart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");
    // console.log(tooltip);

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d, i) {
        tooltip.html(d + ": " + labe_strs[i]).style("opacity", 1);
    }

    var mousemove = function (d, i) {
        tooltip.style("left", (d3.mouse(this)[0]) + "px")
            .style("top", (d3.mouse(this)[1]) + i * 4 + "px");
    }

    var mouseleave = function (d) {
        tooltip.style("opacity", 0);
    }

    svg.selectAll(".bar_label_text1")
        .data(bar_labels)
        .enter()
        .append("rect")
        .attr("class", "bar_label_text1")
        .attr("x", function (d) { return chartWidth / 2 - 70; })
        .attr("y", function (d, i) { return yScale(i); })
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", 140)
        .attr("height", 20)
        .attr("fill", "#59585d")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    svg.selectAll(".bar_label_text2")
        .data(bar_labels)
        .enter()
        .append("text")
        .attr("class", "bar_label_text2")
        .text(d => d)
        .attr("text-anchor", "middle")
        .attr("font-size", 14)
        .attr("x", function (d) { return chartWidth / 2; }) // Adjusted x-attribute
        .attr("y", function (d, i) { return yScale(i) + 15; })
        .attr("fill", "#ffffff")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    svg.selectAll("rect")
        .on("click", function (d) {
            console.log(this);
        });

    // Add X-axis scale
    svg.append("g")
        .attr("transform", "translate(" + (chartWidth / 2 - 1) + "," + chartHeight + ")")
        .call(d3.axisBottom(xScale));

    // left side x-axis
    var negXScale = d3.scaleLinear()
        .domain([-d3.max(data1.concat(data2)) - 10, 0])
        .range([0, chartWidth / 2 - 20]);

    svg.append("g")
        .attr("transform", "translate(19," + chartHeight + ")")
        .call(d3.axisBottom(negXScale));
}

function rounded_rect(x, y, w, h, r, tl, tr, bl, br) {
    var retval;
    retval = "M" + (x + r) + "," + y;
    retval += "h" + (w - 2 * r);
    if (tr) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r; }
    else { retval += "h" + r; retval += "v" + r; }
    retval += "v" + (h - 2 * r);
    if (br) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r; }
    else { retval += "v" + r; retval += "h" + -r; }
    retval += "h" + (2 * r - w);
    if (bl) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r; }
    else { retval += "h" + -r; retval += "v" + -r; }
    retval += "v" + (2 * r - h);
    if (tl) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r; }
    else { retval += "v" + -r; retval += "h" + r; }
    retval += "z";
    return retval;
}

function initialize_chart(params) {
    var data1 = [10, 20, 30, 40, 50];
    var data2 = [30, 40, 20, 10, 50];
    var svg = d3.select("#song_chart")
        .append("svg")
        .attr("width", 600)
        .attr("height", 500);

    var yScale = d3.scaleBand()
        .domain(d3.range(data1.length))
        .range([0, chartHeight])
        .padding(0.1);

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data1.concat(data2))])
        .range([0, chartWidth / 2]);

    // First Bar Chart (Positive X-direction)
    svg.selectAll(".bar1")
        .data(data1)
        .enter()
        .append("rect")
        .attr("class", "bar1")
        .attr("x", function (d) { return chartWidth / 2 - xScale(d); }) // Adjusted x-attribute
        .attr("y", function (d, i) { return yScale(i); })
        .attr("width", function (d) { return xScale(d); })
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue");

    // Separator Line
    svg.append("line")
        .attr("x1", chartWidth / 2)
        .attr("y1", 0)
        .attr("x2", chartWidth / 2)
        .attr("y2", chartHeight)
        .style("stroke", "black")
        .style("stroke-width", 2);

    // Second Bar Chart (Negative X-direction)
    svg.selectAll(".bar2")
        .data(data2)
        .enter()
        .append("rect")
        .attr("class", "bar2")
        .attr("x", chartWidth / 2) // Adjusted x-attribute
        .attr("y", function (d, i) { return yScale(i); })
        .attr("width", function (d) { return xScale(d); })
        .attr("height", yScale.bandwidth())
        .attr("fill", "red");
}


