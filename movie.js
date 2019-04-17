
class movie {
    constructor () {
        this.title=""
        this.plot=""
        this.director=""
        this.actors=[]
        this.year=""
        this.poster=""
    }

    get title() {
        return this._title;
    }
    get plot() {
        return this._plot;
    }
    get director() {
        return this._director;
    }
    get actors() {
        return this._actors;
    }
    get year() {
        return this._year;
    }
    get poster() {
        return this._poster;
    }

    set title(value) {
        this._title = value;
    }
    set plot(value) {
        this._plot = value;
    }
    set director(value) {
        this._director = value;
    }
    set actors(value) {
        this._actors = value;
    }
    set year(value) {
        this._year = value;
    }
    set poster(value) {
        this._poster = value;
    }

}

function getMovieData(movieID) {
    return new Promise((resolve, reject) => {
        url="https://www.omdbapi.com/?apikey=trilogy&i=" + movieID
        fetch(url,{method:"GET"}).then(response=>{return response.json()})
        .then(function (data) {
            if(data["Poster"] != "N/A") {
                result = new movie();
                result.title=data["Title"];
                result.plot=data["Plot"];
                result.director=data["Director"];
                result.actors=data["Actors"];
                result.year=data["Year"];
                result.poster=data["Poster"];

                user.push({
                    Type:"movie",
                    Poster:data["Poster"],
                    Title:data["Title"],
                    Plot:data["Plot"],
                    Year:data["Year"],
                    Director:data["Director"],
                    Actors:data["Actors"]
                })
                resolve(result);
            }
        }).catch(function(error) {
            reject(error);
        })
    })
}

function searchTitle(movieTitle,page) {
    return new Promise((resolve, reject) => {
        url="https://www.omdbapi.com/?apikey=trilogy&s=" + movieTitle + "&page="+page
        fetch(url,{method:"GET"}).then(response=>{return response.json()})
        .then(function (data) {
            resultArray = data["Search"];

            var movieArray = [];

            resultArray.forEach(function(result) {
                console.log(result)
                if (result.Type == "movie" || result.Type == "series") {
                    getMovieData(result.imdbID).then(function(movie) {
                        movieArray.push(movie)
                    });
                }
            })


            return movieArray;
        }).then(function(responseArray) {
            console.log("RETURN MOVIE ARRAY",console.log(responseArray));
            resolve(responseArray);
        }).catch(function(error) {
            reject(error);
        })
    })
}

function pushMovieToDatabase (movie) {
    database.ref().push({
        Poster:movie.poster,
        Title:movie.title,
        Plot:movie.plot,
        Year:movie.year,
        Type:"movie",

    })
}  

function displayMovie (movie) {
    //console.log("Hello 1",index)

    console.log(movie.poster);
    console.log(movie.title);
    console.log(movie.plot);

    var resultDiv = document.createElement("div");
    resultDiv.className = "card d-flex";
    var imgWrapper = document.createElement("div")
            
    imgWrapper.className = "col-md-4";
    var imgEl = document.createElement("img");
    imgEl.setAttribute('src',movie.poster);
    imgWrapper.appendChild(imgEl)
    resultDiv.appendChild(imgWrapper);
            
    textWrapper = document.createElement("div");
    textWrapper.className = "col-md-8";
    tittleEl = document.createElement("div");
    tittleEl.className = "h2";
    tittleEl.textContent = movie.title;
    summaryEl = document.createElement("p");
    summaryEl.textContent = movie.plot;
    textWrapper.appendChild(tittleEl).append(summaryEl);
    resultDiv.appendChild(textWrapper);

    console.log(resultDiv);
    document.querySelector("#result-section").appendChild(resultDiv);
}
