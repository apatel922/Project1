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

    function initialize() {
        var earth = new WE.map('earth_div');
        WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

        var europe = WE.marker([45, 11]).addTo(earth);
        europe.bindPopup("<h1>Europe</h1>", {maxWidth: 150, closeButton: true}).openPopup();

        var africa = WE.marker([8, 20]).addTo(earth);
        africa.bindPopup("<h1>Africa</h1>", {maxWidth: 150, closeButton: true}).openPopup();

        var asia = WE.marker([33, 103]).addTo(earth);
        asia.bindPopup("<h1>Asia</h1>", {maxWidth: 120, closeButton: true}).openPopup();

        var northAmerica = WE.marker([35, -100]).addTo(earth);
        northAmerica.bindPopup("<h1>North America</h1>", {maxWidth: 120, closeButton: true}).openPopup();

        Earch.setView([0, 0], 100);
    }

    initialize()

    

    




});