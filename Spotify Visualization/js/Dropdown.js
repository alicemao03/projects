var countryDropdown = document.getElementById("bubble-country-selected");
var rankingDropdown = document.getElementById("bubble-feature-selected");

renderFeaturesList()

function updateCountryList(data) {
    var rankingType = document.getElementById("bubble-rank-selected");
    rankingType = rankingType.options[rankingType.selectedIndex].value;

    var data;
    if (rankingType == "Daily") { data = daily_top50_all_data }
    else if (rankingType == "Weekly") { data = weekly_top50_all_data }
    else if (rankingType == "Viral") { data = viral_top50_all_data }

    console.log(countryDropdown.options)
    $("#bubble-country-selected").empty()
    console.log(countryDropdown.options)

    var noneOption = document.createElement("option")
    noneOption.text = ""
    noneOption.value = "None"
    countryDropdown.options.add(noneOption);

    data.forEach(function (d) {
        var countryOptions = document.createElement("option")
        countryOptions.text = d[0].country
        countryOptions.value = d[0].country
        countryDropdown.options.add(countryOptions);
        if (selectCountry == d[0].country) {
            document.getElementById("bubble-country-selected").value = selectCountry
        }
    })
}

function renderFeaturesList() {
    let features = ["Popularity", "Ranking", "Danceability", "Energy", "Key", "Mode", "Speechiness", "Acousticness", "Instrumentalness", "Liveness", "Valence", "Tempo"]

    var noneOption = document.createElement("option")
    noneOption.text = ""
    noneOption.value = "None"
    rankingDropdown.options.add(noneOption);

    features.forEach(function (d) {
        var featureOption = document.createElement("option")
        featureOption.text = d
        featureOption.value = d.toLowerCase()
        rankingDropdown.options.add(featureOption);
    })

}

