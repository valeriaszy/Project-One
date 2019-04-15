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
            result = new movie();
            result.title=data["Title"];
            result.plot=data["Plot"];
            result.director=data["Director"];
            result.actors=data["Actors"];
            result.year=data["Year"];
            result.poster=data["Poster"];
            resolve(result);
        }).catch(function(error) {
            reject(error);
        })
    })
}

function parseSinglePage(movieTitle,page) {
    return new Promise((resolve, reject) => {
        url="https://www.omdbapi.com/?apikey=trilogy&s=" + movieTitle + "&page="+page
        fetch(url,{method:"GET"}).then(response=>{return response.json()})
        .then(function (data) {
            resultArray = data["Search"];
            var movieArray = [];
            var waitSig = resultArray.length - 1;
            var callArray = [];

            while(waitSig != 0) {
                resultArray.forEach(function(result) {
                    if(!callArray.includes(result.imdbID)) {
                        if (result.Type == "movie" || result.Type == "series") {
                            getMovieData(result.imdbID).then(function(movie) {
                                movieArray.push(movie);
                                waitSig --;
                            });
                            callArray.push(result.imdbID);
                        }
                    } 
                    
                })
            }
            return movieArray;
        }).then(function(responseArray) {
            resolve(responseArray);
        }).catch(function(error) {
            reject(error);
        })
    })
}

function searchTitle(movieTitle) {
    return new Promise((resolve, reject)=> {
        url="https://www.omdbapi.com/?apikey=trilogy&s=" + movieTitle;
        fetch(url,{method:"GET"}).then(response=>{return response.json()})
        .then(function (data) {
            totalResult = data["totalResults"];
            pageAmount = data["Search"].length;

            var resultArray = [];
            var pageNumber = 1;

            parseSinglePage(movieTitle,pageNumber).then(function(response) {
                resultArray.concat(response);
            })
            totalResult -= pageAmount

            while (totalResult > pageAmount) {
                parseSinglePage(movieTitle,pageNumber).then(function(response) {
                        resultArray.concat(response);
                })
                totalResult -= pageAmount
            }
            
            return resultArray;
        }).then(function(results) {
            console.log("Array",results)
            resolve(results);
        }).catch(function(error) {
            reject(error);
        })
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

document.querySelector("#run-search").addEventListener("click", function(event) {
    event.preventDefault();
    var search = document.querySelector("#search-title").value;
    console.log(search);

    searchTitle(search).then(function (arr) {
        setTimeout( function() {
            arr.forEach(function(e) {
                displayMovie(e);
            })
            return arr;
        },500)
    })
})
