$(document).ready(function (){
    // Added previous months date to capture a months worth of data News Org API
    var lastMonth = moment().subtract(28, "days").format("YYYY-MM-DD");

   // Function to run corona-virus Api
    function initialize() {

        var trackerQueryURL = "https://coronavirus-tracker-api.herokuapp.com/all"

        $.ajax({
            url: trackerQueryURL,
            method: "GET"
        }).then(function (response){
            console.log(response)
            
            // For loop to gather information in the array that mathes location:China
            var chinaCases = 0;
            var chinaDeaths =0;
            for (var i = 0; i < 30; i++ ) {
                chinaCases+=(response.confirmed.locations[i].latest);
                chinaDeaths+=(response.deaths.locations[i].latest);
            }
            
            // Variable to get the latest number of cases and deaths worlwide
            var cases = response.confirmed.latest;
            var deaths = response.deaths.latest;
           
            // Added worldwide death and cases to HTML. 
            $("#deathToll").text(deaths);
            $("#caseToll").text(cases);

            
            //Italy Count
            var italyCases = 0; 
            var italyDeaths = 0;

            // US Count
            usCases = 0;
            usDeaths = 0;

            //Iran Count
            iranCases = 0;
            iranDeaths = 0;

            // For loop to gather information in the array that mathes location: Italy, US and Iran
            for ( var x = 0; x < 159; x++) {
            if (response.confirmed.locations[x].country === "US") {
            usCases +=  response.confirmed.locations[x].latest
            usDeaths += response.deaths.locations[x].latest
            } else if (response.confirmed.locations[x].country === "Iran"){
            iranDeaths+= response.deaths.locations[x].latest
            iranCases+= response.confirmed.locations[x].latest
            } else if (response.confirmed.locations[x].country === "Italy")
            italyCases+= response.confirmed.locations[x].latest
            italyDeaths+= response.deaths.locations[x].latest
            };
            
        

            // Markers that are set for Italy, US, China and Iran on the Map API.
            //Adds the Data gathered in the above for loops to markers to display cases and deaths. 
            var earth = new WE.map('earth_div');
            WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
    
            var italy = WE.marker([45, 11]).addTo(earth);
            italy.bindPopup("<h1>Italy</h1><ul><li>Confirmed Cases: "  + italyCases + "</li><li>Confirmed Deaths: " + italyDeaths + "</li></ul>", {maxWidth: 150, closeButton: true});
            
            var iran = WE.marker([30, 57]).addTo(earth);
            iran.bindPopup("<h1>Iran</h1><ul><li>Confirmed Cases: "  + iranCases + "</li><li>Confirmed Deaths: " + iranDeaths + "</li></ul>", {maxWidth: 150, closeButton: true});
    
            var china = WE.marker([30, 103]).addTo(earth);
            china.bindPopup("<h1>China</h1><ul><li>Confirmed Cases: "  + chinaCases + "</li><li>Confirmed Deaths: " + chinaDeaths + "</li></ul>", {maxWidth: 120, closeButton: true});
    
            var northAmerica = WE.marker([35, -100]).addTo(earth);
            northAmerica.bindPopup("<h1>USA</h1><ul><li>Confirmed Cases: "  + usCases + "</li><li>Confirmed Deaths: " + usDeaths + "</li></ul>", {maxWidth: 120, closeButton: true});
    
            earth.setView([0, 0], 3.5);
        
        
        
        })




    }

    // Calls Map API when document loads. 
    initialize()


    // Moving Space backg by mouse location
    var forcePush = document.querySelector("#mainBlock");

    forcePush.addEventListener("mousemove", function(e) {
        forcePush.style.backgroundPositionX = (-e.offsetX / 15) + "px";
        forcePush.style.backgroundPositionY = (-e.offsetY / 15) + "px";
    });


    
    // Click Event to reveal news articles regarding location
    $(document).on("click", "button", function (e) {
        e.preventDefault();
        var country = $(this).attr("value");
        //Clears article container every time a button is clicked. 
       $("#articleContainer").empty();

    // This is our API key
    var APIKey = "957a4ac1e2724200a4a1249397e81c87";

    // Here we are building the URL we need to query the database
    var queryURL = "https://newsapi.org/v2/top-headlines?q=coronavirus&from=" + lastMonth +"&sortBy=publishedAt&country=" + country + "&apiKey=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object.
       
         var i;
         for (i = 0; i <= 20; i++) {
           
            var article=response.articles[i].description
            var title=response.articles[i].title
            var url=response.articles[i].url
            var author=response.articles[i].author

            //Articles Cards are created dynamically for every object in News API array. 

            var div1 = $("<div>");
            div1.addClass("eight wide column");
            div1.attr("id", "div1");
            var div2 = $("<div>");
            div2.addClass("ui fluid card articleCard");
            div2.attr("id", "div2");
            var div3 = $("<div>");
            div3.addClass("content");
            div3.attr("id", "div3");
            var h3 = $("<h3>");
            h3.attr("id", "header")
            h3.text(title);
            var div4 = $("<div>");
            div4.addClass("ui divider");
            div4.attr("id", "div4");
            var p1 = $("<p>");
            p1.addClass("artDesc")
            p1.attr("id", "description")
            p1.text(article)
            var p2 = $("<p>");
            p2.attr("id", "author")
            p2.text(author);
            var div5 = $("<div>");
            div5.addClass("ui divider");
            div5.attr("id", "div5")

            p3 = $("<a>");
            p3.attr("href",url);
            p3.attr("target", "_blank");
            p3.text("Go to Source")

            div1.append(div2);
            div2.append(div3);
            div3.append(h3,div4,p1,p2,div5,p3)
            $("#articleContainer").append(div1)
        
        }
        

      });
    });


});