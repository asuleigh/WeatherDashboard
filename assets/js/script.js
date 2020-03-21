$('#citySubmit').on('click', function(e) {
    event.preventDefault(e);
    // Grabs and creates variable for city search input
    var cityInput= $('#searchInput').val();
    // API Key
    var OW_API_KEY= "761655843181856ce1e226b5e0cd7d37";
    // URLs for calls
    queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + OW_API_KEY;
    // forecastURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + OW_API_KEY;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        var nextCard= $('<div>').addClass('card mt-4 col-sm-9'),
            nextBody= $('<div>').addClass('card-body p-3'),

            // Append the body to the card
            appendedCard= $(nextCard).append(nextBody),

            // Get current time
            currentTime= moment().format('MM/DD/YY'),

            weatherIcon= $("<img src='http://openweathermap.org/img/wn/" + 
            response.weather[0].icon + ".png' > "),
            
            lat = response.coord.lat,
            lon = response.coord.lon;

        // getting and appending UV Index using coords from initial ajax call
        $.ajax({
            url: uviURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + 
            OW_API_KEY + "&lat=" +lat+ "&lon=" +lon,
            method: "GET"
            }).then(function(data){
            addUVI = $('<p>').attr('class','card-text')
            .append("UV Index: " + data.value);
            $(appendedCard).append(addUVI);
            });

        //
        title = $('<h2>').attr('class','card-title').append( response.name + " (" + currentTime + ") "  ).append(weatherIcon);
        temp = $('<p>').attr('class', 'card-text').append("Current Temp: " + response.main.temp + "°F");
        humidity = $('<p>').attr('class', 'card-text').append("Humidity: " + response.main.humidity + "%");
        windSpeed = $('<p>').attr('class', 'card-text').append("Wind Speed: " + response.wind.speed + "mph");

        // 
        $(appendedCard).append(title, temp, humidity, windSpeed);
    
        //
        $('dayForecast').append(appendedCard);
    });
});

// 
// $('#citySubmit').on('click', function(event){
//     event.preventDefault();
//     weatherSearch();
// });