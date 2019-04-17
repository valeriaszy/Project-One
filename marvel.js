function searchMarvelApi(comic) {

    var publicKey = '7b343b8fcbca56aa7f9d16d2c4ed1c16'
    var privateKey = '5fb816eff68dc0f6948e192c163fdd3133442044'
    var ts = new Date().getTime();
    var hash = md5(ts + privateKey + publicKey).toString();
    var marvelAPI = ['https://gateway.marvel.com/v1/public/comics?title=' + comic]

    $.getJSON(marvelAPI, {
        apikey: publicKey,
        ts: ts,
        hash: hash
    })
        .done(function (response) {
            console.log(response)
            console.log(response.results)
            console.log(response.data.results)
            var results = response.data.results;
            //$('#result-section').append(results.toString());
            var resultsLen = results.length;
            var output = '<div style="display: inline-block">';

            for (var i = 0; i < resultsLen; i++) {
                if (results[i].images.length > 0) {
                    onsaleDate = results[i].dates[0].date;

                    publishDate = new Date(onsaleDate)
                    
                    var comicInfo = {
                        Poster:results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension,
                        Title:results[i].title,
                        PublishedDate:publishDate.getMonth() +'/'+publishDate.getDate()+'/'+publishDate.getYear()
                    }
                    /*var 
                    output += '<div style="display: inline-block; margin:5px"><img src="' + imgPath + '"><br>' + results[i].title + '<br></div>';*/
                }
                user.push(comicInfo);
            }
            
            output += '</div>';
            $('#result-section').empty()
            $('#result-section').append(output);
        });

    // Event handler for user clicking the select-artist button

}

$("#run-search").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    //Storing the artist name
    var inputComic = $("#search-title").val();
    console.log(inputComic)

    //Running the searchBandsInTown function(passing in the artist as an argument)
    searchMarvelApi(inputComic);
    // var results = (response.data.results);
    // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyCtvKNT7TjGHy9wN5aFVXFX0C_Kfz6-Qx0",
    //     authDomain: "marvelapi-a3afe.firebaseapp.com",
    //     databaseURL: "https://marvelapi-a3afe.firebaseio.com",
    //     projectId: "marvelapi-a3afe",
    //     storageBucket: "marvelapi-a3afe.appspot.com",
    //     messagingSenderId: "538840903221"
    // };
    // firebase.initializeApp(config);

    // var userInput = {
    //     results: results,
    //   };

    // var database = firebase.database;

    // console.log(inputComic)
    // database.ref().push(userInput)

});

