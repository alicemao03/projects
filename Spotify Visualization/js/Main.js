
var files = ["data/merged_data/daily_top50_merged_json.json", "data/merged_data/viral_top50_merged_json.json", "data/merged_data/weekly_top50_merged_json.json"];
var promises = [];

files.forEach(function (path) {
	promises.push(d3.json(path))
});

Promise.all(promises).then(function (values) {
	createVis(values[0], values[1], values[2]);
});


function createVis(dailyData, viralData, weeklyData) {
    // var bubbleVis = new BubbleVis(dailyData, viralData, weeklyData);
}