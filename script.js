





// Event listener for all button elements
$("button").on("click", function () {

    //not sure on this one yet, but may need to switch out "this"
    // In this case, the "this" keyword refers to the button that was clicked
    var city = $(this).attr("search_input");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" +
        city + "&APPID=1d0143092f3f763a0d0b8e245be4f7b4";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log()

            var city = response.name;
            var icon = $("<img>");
            icon.attr("src", response.weather[0].icon);
            var temp = $(".temperature").append("Temperature: " + response.main.temp);
            var humidity = $(".humidity").append("Humidity: " + response.main.humidity);
            var windspeed = $(".windspeed").append("Windspeed: " + response.wind.speed);



            /*// Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var personImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    personImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }*/
        });
});