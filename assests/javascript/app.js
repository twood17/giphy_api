var animals = [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "skunk",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugar glider",
    "chinchilla",
    "hedgehog",
    "hermit crab",
    "gerbil",
    "pygmy goat",
    "chicken",
    "capybara",
    "teacup pig",
    "serval",
    "salamander",
    "frog"
  ];
  
  function displayAnimalGifs() {
    var animal = $(this).attr("data-animal");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Ke34Nu04XKYltBLaVn2mKrtZdR4BG4Ie&limit=10";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      var results = response.data;
  
      // this for loop goes through the results length (which is limited to 10) and adds a class of gif and multiple attributes to help
      // control the gifs and adds details that appear on the page
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class='col-sm-4'>");
        var p = $("<p>").append(`
        Title: ${results[i].title.toUpperCase()}</br>
        Rating: ${results[i].rating.toUpperCase()}`);
        var animalImage = $("<img>");
        animalImage.addClass("gif");
        animalImage.attr("data-state", "animate");
        animalImage.attr("animate", results[i].images.fixed_height.url);
        animalImage.attr("still", results[i].images.fixed_height_still.url);
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.append(animalImage);
        animalDiv.append(p);
        $("#animal-gifs").prepend(animalDiv);
      }
  
      // when a gif is clicked it will change its src to the still image and when clicked again will switch it back to the animated src
      $(".gif").on("click", function() {
        
        var state = $(this).attr("data-state");
        if (state === "animate") {
          $(this).attr("src", $(this).attr("still"));
          $(this).attr("data-state", "still");
        } else {
          $(this).attr("src", $(this).attr("animate"));
          $(this).attr("data-state", "animate");
        }
      });
    });
  }
  
  // this function is run when the page loads as well as when user submits input into the 'add an animal' form
  // it gives each button a class, an attribute, and the displays the text that was put into the form
  function renderButtons() {
    $("#buttons-view").empty();
  
    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");
      a.addClass("animal-btn");
      a.attr("data-animal", animals[i]);
      a.text(animals[i]);
      $("#buttons-view").append(a);
    }
  }
  
  // when the submit button is clicked and has text in it it will create a button that can be clicked to create gifs
  // if no text is entered the submit button will not add a button
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
  
    var animal = $("#animal-input")
      .val()
      .trim();
  
    if (animal === "") {
      return;
    } else {
      animals.push(animal);
  
      renderButtons();
    }
  });
  
  // when anything with the class of 'animal-btn' is clicked, displayAnimalGifs runs
  $(document).on("click", ".animal-btn", displayAnimalGifs);
  
  //creates buttons from the base animal array when page loads
  renderButtons();