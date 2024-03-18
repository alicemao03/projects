function loadDailyTop50(data) {
    console.log('loadDailyTop50');
    daily_top50_all_data = data;
    initialize_country();

    updateCountryList(data)
}

function loadWeeklyTop50(data) {
    console.log('loadWeeklyTop50');
    weekly_top50_all_data = data;
}

function loadViralTop50(data) {
    console.log('loadViralTop50');
    viral_top50_all_data = data;
}
