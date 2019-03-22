//Starting Javascript

var character = $("#sw-form").val().trim();
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Ke34Nu04XKYltBLaVn2mKrtZdR4BG4Ie&q=" + character +
    "&limit=10&offset=0&rating=G&lang=en"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
   console.log(response);
});