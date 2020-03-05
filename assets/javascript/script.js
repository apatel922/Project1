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
            console.log(cases);

            var deaths = response.deaths.latest;
            console.log(deaths);

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
    
            var europe = WE.marker([45, 11]).addTo(earth);
            europe.bindPopup("<h1>Italy</h1><ul><li>Confirmed Cases: "  + italyCases + "</li><li>Confirmed Deaths: " + italyDeaths + "</li></ul><h1>Iran</h1>", {maxWidth: 150, closeButton: true}).openPopup();
            console.log(europe);
    
            var africa = WE.marker([30, 57]).addTo(earth);
            africa.bindPopup("<h1>Iran/h1><ul><li>Confirmed Cases: "  + iranCases + "</li><li>Confirmed Deaths: " + iranDeaths + "</li></ul><h1>Iran</h1>", {maxWidth: 150, closeButton: true}).openPopup();
    
            var china = WE.marker([30, 103]).addTo(earth);
            china.bindPopup("<h1>China</h1><ul><li>Confirmed Cases: "  + chinaCases + "</li><li>Confirmed Deaths: " + chinaDeaths + "</li></ul>", {maxWidth: 120, closeButton: true}).openPopup();
    
            var northAmerica = WE.marker([35, -100]).addTo(earth);
            northAmerica.bindPopup("<h1>USA</h1><ul><li>Confirmed Cases: "  + usCases + "</li><li>Confirmed Deaths: " + usDeaths + "</li></ul><h1>Iran</h1>", {maxWidth: 120, closeButton: true}).openPopup();
    
            earth.setView([0, 0], 3.5);
        
        
        
        })




    }

    initialize()


    // Moving Space backg by mouse location
    var forcePush = document.querySelector("#mainBlock");

    forcePush.addEventListener("mousemove", function(e) {
        forcePush.style.backgroundPositionX = (-e.offsetX / 15) + "px";
        forcePush.style.backgroundPositionY = (-e.offsetY / 15) + "px";
    });


});