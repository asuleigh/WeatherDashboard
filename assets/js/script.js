var cityInput= $("#searchInput").val();

var OW_API_KEY= "166a433c57516f51dfab1f7edaed8413";

let date= new Date();

queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + OW_API_KEY;

var url= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + OW_API_KEY;