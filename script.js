$(document).ready(function () {
  //variable api key
  let apiKey = "";

  let actor = "";
  let movies = "";
  let title = "";
  let cast = "";
  let criticsRating = 0;
  let getYear = "";
  let movieRated = "";
  var movieSearch = $(".Input");
  var actorSearch = $(".Actor");

  // This .on("click") function will trigger the AJAX Call
  $("#submit").click(function () {
    const searchInput = JSON.parse(localStorage.getItem("Input")) || [];

    // grab the text from the input box
    var searchInput = movieSearch.text().val().trim;
  });
});
