$(document).ready(function (){

    var trackerQueryURL = "https://coronavirus-tracker-api.herokuapp.com/all"

        $.ajax({
            url: trackerQueryURL,
            method: "GET"
        }).then(function (response){
            console.log(response)
    })

    
    var apiKey = "1104fdb9877b4e0baabc1fcc7eb72d8c"

    var newsQueryURL = "http://newsapi.org/v2/everything?" +
    "q=Apple&" + 'from=2020-02-29&' + 'sortBy=popularity&' + apiKey
    
    $.ajax({
        url: newsQueryURL,
        method: "GET"
    }).then(function (response1){
        console.log(response1)
    })


    todaysDate = moment().format('L');


    function initialize() {

        var trackerQueryURL = "https://coronavirus-tracker-api.herokuapp.com/all"

        $.ajax({
            url: trackerQueryURL,
            method: "GET"
        }).then(function (response){
            console.log(response)

            var chinaCases = 0;
            for (var i = 0; i < 30; i++ ) {
                chinaCases+=(response.confirmed.locations[i].latest);
            }
            console.log(chinaCases)

        
            var earth = new WE.map('earth_div');
            WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
    
            var europe = WE.marker([45, 11]).addTo(earth);
            europe.bindPopup("<h1>Europe</h1><ul><li></li></ul>", {maxWidth: 150, closeButton: true}).openPopup();
    
            var africa = WE.marker([8, 20]).addTo(earth);
            africa.bindPopup("<h1>Africa</h1>", {maxWidth: 150, closeButton: true}).openPopup();
    
            var china = WE.marker([33, 103]).addTo(earth);
            china.bindPopup("<h1>China</h1><ul><li>Confirmed Cases (as of " + todaysDate + "): "  + chinaCases + "</li></ul>", {maxWidth: 120, closeButton: true}).openPopup();
    
            var northAmerica = WE.marker([35, -100]).addTo(earth);
            northAmerica.bindPopup("<h1>North America</h1>", {maxWidth: 120, closeButton: true}).openPopup();
    
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