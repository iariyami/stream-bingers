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

  let Title = "Die Hard";
  let Actor = "Bruce Willis";
  let provider = [
    "Netflix",
    "Hulu",
    "AmazonPrimeVideo",
    "GooglePlay",
    "iTunes",
  ];
  let offerType = "";
  alert("are we talking");

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
        "The are content provider requires:",
        offerType,
        "for their service",
        service,
        "has this much content matching your search available: ",
        response.Hits.length
      );
      let content = response.Hits.length - 1;
      for (c = 0; c < content; c++) {
        console.log("Titles: ", response.Hits[c].Source.Title);
        console.log("status: ", response.Hits[c].Source.Status);
        console.log("status: ", response.Hits[c].Source.ProgramType);
        // console.log("status: ", response.Hits[c].Source.OfficialSiteUrl);
      }
    });
  }

  // This .on("click") function will trigger the AJAX Call
  $("#submit").on("click", function () {
    // const searchInput = JSON.parse(localStorage.setItem("Input")) || [];
    // grab the text from the input box
    // var searchInput = movieSearch.val().trim();
  });
});
