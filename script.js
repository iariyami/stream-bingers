$(document).ready(function () {
  $(".media").hide();








  let provider = [
    "Netflix",
    "Hulu",
    "AmazonPrimeVideo",
    "GooglePlay",
    "iTunes",
  ];
  let offerType = "";
  alert("are we talking");

  // var movies = JSON.parse(localStorage.getItem(title)) || [];
  // search API for OMDB and  re-renders the HTML to display the appropriate content

  function searchOMDB(title, actor) {



    // constructing a queryURL variable we will use instead of the literal string inside of the ajax method

    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (responseOMDB) {

      let searchActor = responseOMDB.Actors;
      let actingIn = searchActor.split(',');
      console.log("this is the cast", actingIn);



      let actorIndex = actingIn.indexOf(actor);
      leadActor = actingIn[actorIndex];
      console.log("this is the lead actor", leadActor);
      console.log(responseOMDB);
      console.log(responseOMDB.Title);
      console.log(responseOMDB.Year);
      console.log(responseOMDB.Actors);
      console.log(responseOMDB.Plot);
      console.log(responseOMDB.Rated);
      console.log(responseOMDB.Ratings[1].Source);
      console.log(responseOMDB.Ratings[1].Value);
      console.log(responseOMDB.Runtime);

      // fetch api data and convert to variables
      Title = responseOMDB.Title;
      getYear = responseOMDB.Year;
      pCast = responseOMDB.Actors;
      pPlot = responseOMDB.Plot;
      pRated = responseOMDB.Rated;
      criticsRatingS = responseOMDB.Ratings[1].Source;
      criticsRatingV = responseOMDB.Ratings[1].Value;


      // Retrieving the URL for the image
      var imgURL = responseOMDB.Poster;

      // Creating an element to hold the image
      let pImg = $("<p class='image is-200x200'>");
      let image = $("<img>").attr("src", imgURL);
      $(".media-left").append(pImg)
      pImg.append(image);
      // Transfer content to HTML and append to appropriate DOM element
      let p1 = $("<p>").text("Title:  " + Title).css("font-size", "25px");
      let p2 = $("<p>").text("Year of Release:  " + getYear);
      let p3 = $("<p>").text("Cast:  " + pCast);
      let p4 = $("<p>").text("Short Plot:  " + pPlot);
      let p5 = $("<p>").text("Rated:  " + pRated);
      let p6 = $("<p>").text("Critics Review:  " + criticsRatingS + " " + "gives it a " + criticsRatingV);
      let spacer = $("<div>").css("margin-bottom", "200px");
      let hardhr = $("<hr>");
      // show media content that was hidden for a clean looking UI

      $(".media").show();

      //empty media body to replace with new appends


      $(".content").append(p1, p2, p3, p4, p5, p6, spacer, hardhr);

      // Appending the image when go to DOM actions

      Actor = leadActor;
      searchIVA(Title, Actor);

    })
  }


  function searchIVA(Title, Actor) {
    for (i = 0; i < provider.length; i++) {
      let settings = {
        async: true,
        crossDomain: true,
        url:
          "https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/?PersonNames=" +
          Actor +
          "&Title=" +
          Title +
          "&ProgramTypes=Show&ProgramTypes=Movie&Providers=" +
          provider[i],
        method: "GET",
        // error: checkContent(),
        headers: {
          "x-rapidapi-host":
            "ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com",
          "x-rapidapi-key": "acd626c871msh56e79dd581cd845p1e0ed3jsndbc38000616c",
          "content-type": "application/json",
        },
      };
      let service = provider[i];
      $.ajax(settings).done(function (response) {
        if (
          service === "Netflix" ||
          service === "Hulu" ||
          service === "AmazonPrimeVideo"
        ) {
          offerType = "Subscription";
        } else {
          offerType = "Buy or Rent";
        }
        console.log(response);

        console.log(
          "The content provider" + service + "requires:",
          offerType,
          "for their content and they have" + response.Hits.length + " number of related content to your search");



        let content = response.Hits.length;
        for (c = 0; c < content; c++) {
          console.log("Titles: ", response.Hits[c].Source.Title);
          console.log("status: ", response.Hits[c].Source.Status);
          console.log("status: ", response.Hits[c].Source.ProgramType);
          relateTitles = response.Hits[c].Source.Title;
          statusTitles = response.Hits[c].Source.Status;
          contenType = response.Hits[c].Source.ProgramType;
          let brline = $("<br>");
          let separator = $("<hr>");
          let pfive = $("<p>").text("The content provider " + service + " requires: " +
            offerType +
            " for their content and they have " + response.Hits.length + " related content to your search").css("font-weight", "300");
          let pOne = $("<p>").text("Titles:  " + relateTitles).css("font-size", "25px");
          let pTwo = $("<p>").text("The status of this content is: " + statusTitles);
          let pThree = $("<p>").text("The type of this content is: " + contenType);
          $(".content").append(separator, pfive, brline, pOne, brline, pTwo, brline, pThree, separator);
        }

      })
    }
  }

  // This function handles events where a  button is clicked 

  $(".button").on("click", function (event) {
    event.preventDefault();

    // This line consumes the input from the textbox value

    let title = $(".titles").val().trim();
    let actor = $(".actors").val().trim();



    Title = title;


    searchOMDB(Title, actor);

  })
  $(".delete").on("click", function (event) {
    event.preventDefault();

    $(".media").empty();
    $(".titles").val("");
    $(".actors").val("");


  })

});
