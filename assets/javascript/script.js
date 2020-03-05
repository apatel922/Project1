

$(document).ready(function (){


    todaysDate = moment().format('L');



    function initialize() {

        var trackerQueryURL = "https://coronavirus-tracker-api.herokuapp.com/all"

        $.ajax({
            url: trackerQueryURL,
            method: "GET"
        }).then(function (response){
            console.log(response)
            // China Data
            var chinaCases = 0;
            var chinaDeaths =0;
            for (var i = 0; i < 30; i++ ) {
                chinaCases+=(response.confirmed.locations[i].latest);
                chinaDeaths+=(response.deaths.locations[i].latest);
            }
            
            //World Data
            var cases = response.confirmed.latest;
            var deaths = response.deaths.latest;
           
            $("#deathToll").text(deaths + "/" + cases);
            console.log(cases)

            // Italy Data

            var italyCases = response.confirmed.locations[59].latest
            var italyDeaths = response.deaths.locations[59].latest

            // US Data
            usCases = 0;
            usDeaths = 0;
            for ( var x = 0; x < 159; x++) {
            if (response.confirmed.locations[x].country === "US") {
            usCases +=  response.confirmed.locations[x].latest
            usDeaths += response.deaths.locations[x].latest
            }
            }
            
            // Iran Data
            iranCases = response.confirmed.locations[74].latest
            iranDeaths = response.deaths.locations[74].latest
        


            var earth = new WE.map('earth_div');
            WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
    
            var italy = WE.marker([45, 11]).addTo(earth);
            italy.bindPopup("<h1>Italy</h1><ul><li>Confirmed Cases: "  + italyCases + "</li><li>Confirmed Deaths: " + italyDeaths + "</li></ul>", {maxWidth: 150, closeButton: true}).openPopup();
            
    
            var iran = WE.marker([30, 57]).addTo(earth);
            iran.bindPopup("<h1>Iran</h1><ul><li>Confirmed Cases: "  + iranCases + "</li><li>Confirmed Deaths: " + iranDeaths + "</li></ul>", {maxWidth: 150, closeButton: true}).openPopup();
    
            var china = WE.marker([30, 103]).addTo(earth);
            china.bindPopup("<h1>China</h1><ul><li>Confirmed Cases: "  + chinaCases + "</li><li>Confirmed Deaths: " + chinaDeaths + "</li></ul>", {maxWidth: 120, closeButton: true}).openPopup();
    
            var northAmerica = WE.marker([35, -100]).addTo(earth);
            northAmerica.bindPopup("<h1>USA</h1><ul><li>Confirmed Cases: "  + usCases + "</li><li>Confirmed Deaths: " + usDeaths + "</li></ul>", {maxWidth: 120, closeButton: true}).openPopup();
    
            earth.setView([0, 0], 3.5);
        
        
        
        })




    }

    initialize()


    // This is our API key
    var APIKey = "957a4ac1e2724200a4a1249397e81c87";

    // Here we are building the URL we need to query the database
    var queryURL = "http://newsapi.org/v2/everything?q=coronavirus&from=2020-02-05&sortBy=publishedAt&apiKey=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
       
         var i;
         for (i = 0; i <= 20; i++) {
           
          var article=response.articles[i].description
          console.log(article)
  
          var title=response.articles[i].title
          console.log(title)
  
          var url=response.articles[i].url
          console.log(url)
  
          var author=response.articles[i].author
          console.log(author)
        }


      });


});