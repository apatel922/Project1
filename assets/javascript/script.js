$(document).ready(function (){


    var trackerQueryURL = "https://coronavirus-tracker-api.herokuapp.com/all"

        $.ajax({
            url: trackerQueryURL,
            method: "GET"
        }).then(function (response){
            console.log(response)
        })








});