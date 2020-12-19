//Declare a variable to store the searched city
var city = "";
//Declaring variables.
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");
var sCity = [];
// searches the city to see if it exists in the entries from the storage
function find(c) {
    for (var i = 0; i < sCity.length; i++) {
        if (c.toUpperCase() === sCity[i]) {
            return -1;
        }
    }
    return 1;
}
//Displays current and 5 day forecast to the user from the input
function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        currentWeather(city);
    }
}
//ajax call to retrieve the informaton
function currentWeather(city) {
    //creating a url to get the weather for the city
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" +
        city + "&APPID=1d0143092f3f763a0d0b8e245be4f7b4";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            //console log to display weather information
            console.log(response)
            //variables for icons
            var weathericon = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
            //variable for date
            var date = new Date(response.dt * 1000).toLocaleDateString();
            //variable for current city and concantinating city, date, and icon
            $(currentCity).html(response.name + "(" + date + ")" + "<img src=" + iconURL + ">");
            //Variable for Temperature
            //Display Temperature and convert to Fahrenheit
            var tempFar = (response.main.temp - 273.15) * 1.80 + 32;
            $(currentTemperature).html((tempFar).toFixed(2) + "&#8457");
            //display humidity
            $(currentHumidty).html(response.main.humity + "%");
            //var for windspeed
            //display windspeed
            //convert windspeed to MPH
            var ws = response.wind.speed;
            var wsMPH = (ws * 2.237).toFixed(1);
            $(currentWSpeed).html(wsMPH + "MPH");
            //displaying and dealing with the UV Index...........
            //got major major assistance on this from YouTube Tutorials
            UVIndex(response.coord.lon, response.coord.lat);
            forecast(response.id);
            if (response.cod == 200) {
                sCity = JSON.parse(localStorage.getItem("cityname"));
                console.log(sCity);
                if (sCity == null) {
                    sCity = [];
                    sCity.push(city.toUpperCase());
                    localStorage, setItem("cityname", JSON.stringify(sCity));
                    addToList(city);
                }
                else {
                    if (find(city) > 0) {
                        sCity.push(city.toUpperCase());
                        localStorage, setItem("cityname", JSON.stringify(sCity));
                        addToList(city);
                    }
                }
            }
        });
}

//function for UVIndex repsone
//also got a lot of assitance from YouTube Tutorials on this as well on this fucntion
function UVIndex(ln,lt){
    var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+"1d0143092f3f763a0d0b8e245be4f7b4"+"&lat="+lt+"&lon="+ln;
    $.ajax({
        url:uvqURL,
        method:"GET"
    })
    .then(function(response){
        $(currentUvindex).html(response.value);
    });
}

