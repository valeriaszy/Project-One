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
    }).done(function (response) {
            var results = response.data.results;
            var resultsLen = results.length;
            console.log("FINISHED LOOKING FOR MARVEL COMIC:",comic);
            for (var i = 0; i < resultsLen; i++) {
                if (results[i].images.length > 0) {
                    onsaleDate = results[i].dates[0].date;
                    publishDate = new Date(onsaleDate)
                    
                    var comicInfo = {
                        Type:"comic",
                        Poster:results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension,
                        Title:results[i].title,
                        PublishedDate:publishDate.getMonth() +'/'+publishDate.getDate()+'/'+publishDate.getYear()
                    }
                }
                console.log("PUSHING THIS:" +comicInfo);
                user.push(comicInfo);
            }
        });
}


