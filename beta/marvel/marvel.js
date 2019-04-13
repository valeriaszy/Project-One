function searchMarvelApi(comic){
    
    var config = {
    apiKey: "AIzaSyA8kEgnv75jLgZznRXBSpD7FGHd0ulv8Jo",
    authDomain: "project-one-7cd8f.firebaseapp.com",
    databaseURL: "https://project-one-7cd8f.firebaseio.com",
    projectId: "project-one-7cd8f",
    storageBucket: "project-one-7cd8f.appspot.com",
    messagingSenderId: "147656414734"
  };
  firebase.initializeApp(config);

    var publicKey = '7b343b8fcbca56aa7f9d16d2c4ed1c16'
    var privateKey = '5fb816eff68dc0f6948e192c163fdd3133442044'
    var ts = new Date().getTime();
    var hash = md5(ts + privateKey + publicKey).toString();
    var marvelAPI = 'https://gateway.marvel.com/v1/public/comics?title='+ comic;

    $.getJSON(marvelAPI, {
        apikey: publicKey,
        ts: ts,
        hash: hash
    })
        .done(function (response) {
            console.log(response)
            console.log(response.results)
            var results = response.data.results;
           //$('#result-section').append(results.toString());
            var resultsLen = results.length;
            var output = '<ul>';

            for (var i = 0; i < resultsLen; i++) {
                if (results[i].images.length > 0) {
                    var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                    output += '<li><img src="' + imgPath + '"><br>' + results[i].title + '</li>';
                }
            }
            output += '</ul>';
            $('#result-section').empty()
            $('#result-section').append(output);
        });
  
        // Event handler for user clicking the select-artist button
 
    }

$("#run-search").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputComic = $("#search-title").val();
    console.log(inputComic)

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchMarvelApi(inputComic);
  });
