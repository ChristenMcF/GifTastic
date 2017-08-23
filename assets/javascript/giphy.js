var animals = ["cat", "dog", "unicorn", "lion", "bear", "pygmy goat", "panda",
    "skunk", "iguana", "tiger", "hedgehog", "raccoon"
];

function makeButtons() {
  $("#animalBtns").empty();

  for (var i = 0; i < animals.length; i++) {

    var button = $("<button>");
    button.addClass("animalButton");
    button.attr("data-animal", animals[i]);
    button.text(animals[i]);


    $("#animalBtns").append(button);
  }
}

$("#addAnimal").on("click", function(event) {
  event.preventDefault();
 
  var animal = $("#animalInput").val().trim();

  animals.push(animal);
  $("#animalInput").val("");

  makeButtons();
});

function getGifs() {

  var animalName = $(this).attr("data-animal");
  var animalStr = animalName.split(" ").join("+");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalStr + 
        "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    var newData = result.data;

    $("#gifs").empty();
    for (var i = 0; i < newData.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("animalGif");

      var newRating = $("<h4>").html("Rating: " + newData[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", newData[i].images.fixed_height_still.url);
      newImg.attr("data-still", newData[i].images.fixed_height_still.url);
      newImg.attr("data-animate", newData[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      $("#gifs").append(newDiv);
    }
  });
}

function animateGif() {
  var state = $(this).find("img").attr("data-state");

  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
} else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

$(document).ready(function() {
  makeButtons();
});

$(document).on("click", ".animalButton", getGifs);

$(document).on("click", ".animalGif", animateGif);