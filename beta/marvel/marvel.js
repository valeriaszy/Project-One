$(document).ready(function () {
    var publicKey = '7b343b8fcbca56aa7f9d16d2c4ed1c16'
    var privateKey = '5fb816eff68dc0f6948e192c163fdd3133442044'
    var ts = new Date().getTime();
    var hash = md5(ts + privateKey + publicKey).toString();
    var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';

    $.getJSON(marvelAPI, {
        apikey: publicKey,
        ts: ts,
        hash: hash
    })
        .done(function (response) {
            console.log(response)
            var results = response.data.results;
            $('#result-section').append(results.toString());
            var resultsLen = results.length;
            var output = '<ul>';

            for (var i = 0; i < resultsLen; i++) {
                if (results[i].images.length > 0) {
                    var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                    output += '<li><img src="' + imgPath + '"><br>' + results[i].title + '</li>';
                }
            }
            output += '</ul>'
            $('#result-section').append(output);
        });

});