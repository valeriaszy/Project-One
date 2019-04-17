
function getMovieData(movieID) {
    return new Promise((resolve, reject) => {
        url="https://www.omdbapi.com/?apikey=trilogy&i=" + movieID
        fetch(url,{method:"GET"}).then(response=>{return response.json()})
        .then(function (data) {
            resolve(data);
        }).catch(function(error) {
            reject(error);
        })
    })
}

function searchTitle(movieTitle) {
    url="https://www.omdbapi.com/?apikey=trilogy&s=" + movieTitle + "&page=1"
    fetch(url,{method:"GET"}).then(response=>{return response.json()})
    .then(function (data) {
        resultArray = data["Search"];
        
        //declaring offset and waitSignal;
        var promiseCall = [];

        resultArray.forEach(function(result) {
            if (result.Type == "movie" || result.Type == "series") {
                var newPromise = getMovieData(result.imdbID);
                promiseCall.push(newPromise);
            }    
        })

        Promise.all(promiseCall).then(function(values) {
            values.forEach(function (data) {
                if(data["Poster"] != "N/A") {
                    user.push({
                        Type:"movie",
                        Poster:data["Poster"],
                        Title:data["Title"],
                        Plot:data["Plot"],
                        Year:data["Year"],
                        Director:data["Director"],
                        Actors:data["Actors"]
                    })
                }
            })
        })
    })
}




