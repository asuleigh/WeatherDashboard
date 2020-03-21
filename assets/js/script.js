// onClick function for rendering forecast of a single day
$('#citySubmit').on('click', function(e) {
    event.preventDefault(e);
    // Grabs and creates variable for city search input
    var cityInput= $('#cityInput').val();
    // API Key
    var OW_API_KEY= "761655843181856ce1e226b5e0cd7d37";
    // URLs for calls
    queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + OW_API_KEY;
    // forecastURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + OW_API_KEY;
    
    // Ajax call to retrieve information from the OpenWeatherMap API to 
    // use in creating a card to display the current weather
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        // check work
        // console.log(response);

        // Creates and sets a variable for each new card and card body
        var nextCard= $('<div>').addClass('card col-sm-9 mt-3 text-dark'),
            nextBody= $('<div>').addClass('card-body py-1'),

            // Appends the body to the card
            appendedCard= $(nextCard).append(nextBody),

            // Gets current time
            currentTime= moment().format('MM/DD/YY'),

            // Grabs source for the weather icons
            weatherIcon= $("<img src='http://openweathermap.org/img/wn/" + 
            response.weather[0].icon + ".png' > "),
            
            // Sets lat and lon
            lat = response.coord.lat,
            lon = response.coord.lon;

        // Ajax call for getting the UV Index by using coords for each city
        $.ajax({
            url: uviURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + 
            OW_API_KEY + "&lat=" +lat+ "&lon=" +lon,
            method: "GET"
            })
            .then(function(data){
            addUVI = $('<p>').attr('class','card-text')
            .append("UV Index: " + data.value);

            $(appendedCard).append(addUVI);
            });

        // Creates elements and appends attributes for the forecast card
        title = $('<h2>').attr('class','card-title').append( response.name + " (" + currentTime + ") "  ).append(weatherIcon);
        temp = $('<p>').attr('class', 'card-text').append("Temperature: " + response.main.temp + "°F");
        humidity = $('<p>').attr('class', 'card-text').append("Humidity: " + response.main.humidity + "%");
        windSpeed = $('<p>').attr('class', 'card-text').append("Wind Speed: " + response.wind.speed + "mph");

        // Appends the attributes set above to the card
        $(appendedCard).append(title, temp, humidity, windSpeed);
    
        // Appends each new forecast call as a new card
        $('#dayForecast').append(appendedCard);
    });

    // Clears the city input after the search function is carried out
    $("#cityInput").val("");
});