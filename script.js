$(document).ready(function () {


  // clear media object for a clean UI
  $(".media").hide();
  $(".modal").hide();
  $(".titles").attr("disabled", false);
  $(".actors").attr("disabled", false);

  // array of providers included in search 
  let provider = [
    "Netflix",
    "Hulu",
    "AmazonPrimeVideo",
    "GooglePlay",
    "iTunes",
  ];

  // variables declared
  let offerType = "";

  // search API for OMDB and  re-renders the HTML to display the appropriate content

  function searchOMDB(title, actor) {



    // constructing a queryURL variable we will use instead of the literal string inside of the ajax method

    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (responseOMDB) {

      // comma deliminate array to search for lead actor
      let searchActor = responseOMDB.Actors;
      let actingIn = searchActor.split(',');
      leadActor = actingIn[0];
      console.log("lead", leadActor);


      // fetch api data and convert to variables
      Title = responseOMDB.Title;
      getYear = responseOMDB.Year;
      pCast = searchActor;
      pPlot = responseOMDB.Plot;
      pRated = responseOMDB.Rated;
      criticsRatingS = responseOMDB.Ratings[1].Source;
      criticsRatingV = responseOMDB.Ratings[1].Value;


      // Retrieving the URL for the image
      var imgURL = responseOMDB.Poster;

      // Creating an element to hold the image
      let pImg = $("<p class='image is-100x100  is-hidden-touch'>");
      let image = $("<img>").attr("src", imgURL);
      $(".media-left").append(pImg)
      // append poster image to media object dynamically
      pImg.append(image);
      // Transfer content to HTML and append to appropriate DOM element
      // assign Bulma classes for responsiveness
      let p1 = $("<p>").text("Title:  " + Title).css("font-size", "25px");
      p1.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
      let p2 = $("<p>").text("Year of Release:  " + getYear);
      p2.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
      let p3 = $("<p>").text("Cast:  " + pCast);
      p3.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
      let p4 = $("<p>").text("Short Plot:  " + pPlot);
      p4.addClass("is-block-desktop-only is-hidden-touch");
      let p5 = $("<p>").text("Rated:  " + pRated);
      p5.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
      let p6 = $("<p>").text("Critics Review:  " + criticsRatingS + " " + "gives it a " + criticsRatingV);
      p6.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
      let spacer = $("<div>").css("margin-bottom", "250px");
      spacer.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
      let hardhr = $("<hr>");
      hardhr.addClass("is-block-desktop-only is-block-touch is-block-mobile");
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
        headers: {
          "x-rapidapi-host":
            "ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com",
          "x-rapidapi-key": "acd626c871msh56e79dd581cd845p1e0ed3jsndbc38000616c",
          "content-type": "application/json",
        }
      };
      let service = provider[i];
      $.ajax(settings).done(function (response) {
        // determine if the type of service per provider condition statement
        if (
          service === "Netflix" ||
          service === "Hulu" ||
          service === "AmazonPrimeVideo"
        ) {
          offerType = "Subscription";
        } else {
          offerType = "Buy or Rent";
        }
        //  determine the number responses per content provider
        let content = response.Hits.length;

        // loop to update the DOM with provider offerings includes movies, shows, title, amount of content per provider and status of content
        for (c = 0; c < content; c++) {
          // fetch api data and convert to variables
          relateTitles = response.Hits[c].Source.Title;
          statusTitles = response.Hits[c].Source.Status;
          contenType = response.Hits[c].Source.ProgramType;

          // Transfer content to HTML and append to appropriate DOM element
          // assign Bulma classes for responsiveness
          let brline = $("<br>");
          brline.addClass("is-block-desktop-only is-block-touch is-block-mobile");
          let separator = $("<hr>");
          separator.addClass("is-block-desktop-only is-block-touch is-block-mobile");
          let pfive = $("<p>").text("The content provider " + service + " requires: " +
            offerType +
            " for their content and they have " + response.Hits.length + " related content to your search").css("font-weight", "300");
          pfive.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
          let pOne = $("<p>").text("Titles:  " + relateTitles).css("font-size", "25px");
          pOne.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
          let pTwo = $("<p>").text("The status of this content is: " + statusTitles);
          pTwo.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
          let pThree = $("<p>").text("The type of this content is: " + contenType);
          pThree.addClass("is-block-desktop-only is-block-touch is-inline-mobile");
          // Transfer content to HTML and append to appropriate DOM element
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
    // user must input at least a title
    if (title === "") {
      $("#clrText").text("Input a title please (clear)");
    }
    Title = title;
    // call the OMDB api with title and actor arguments
    searchOMDB(Title, actor);
    $(".titles").attr("disabled", true);
    $(".titles").val("");
    $(".actors").attr("disabled", true);
    $(".actors").val("");


  })

  //  this is the media object clear button event handler and clears text input as well
  $(".clBtn").on("click", function (event) {
    event.preventDefault();

    // $(".media").empty();
    $(".titles").val("");
    $(".actors").val("");
    location.reload(true);
  })

});
