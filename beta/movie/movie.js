
class movie {
    constructor () {
        this.title=""
        this.plot=""
        this.director=""
        this.actors=[]
        this.year=""
        this.poster=""
    }
    set tittle(value) {
        this._tittle = value;
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

document.querySelector("#run-search").addEventListener("click", function(event) {
    event.preventDefault();

    console.log("Clicked")
    var search = document.querySelector("#search-title").value;
    console.log(search);
    var promise = searchTitle(search,1)

    promise.then(function(movieArray) {
    movieArray.forEach(function(movie){

    console.log(movie)

    var resultDiv = document.createElement("div");
    resultDiv.className = "col-md-4";
    var imgWrapper = document.createElement("div")
    
    imgWrapper.className = "col-md-4";
    var imgEl = document.createElement("img");
    imgEl.setAttribute('src',movie.poster);
    imgEl.setAttribute('width','50%');
    imgEl.className = "image-responsive";
    imgWrapper.appendChild(imgEl)
    resultDiv.appendChild(imgWrapper);
    
    textWrapper = document.createElement("div");
    textWrapper.className = "col-md-8";
    tittleEl = document.createElement("div");
    tittleEl.className = "h2";
    tittleEl.textContent = movie.tittle;
    summaryEl = document.createElement("p");
    summaryEl.textContent = movie.plot;
    textWrapper.appendChild(tittleEl).append(summaryEl);
    resultDiv.appendChild(textWrapper);

    console.log(resultDiv);
    document.querySelector("#result-section").appendChild("Hello").appendChild(resultDiv);
    })
}).catch(function(errors) {
    console.log(errors.code)
})
})

function searchTitle(movieTitle,page) {
    return new Promise((resolve, reject) => {
        movieArray = [];
        url="https://www.omdbapi.com/?apikey=trilogy&s=" + movieTitle + "&page="+page
        fetch(url,{method:"GET"}).then(response=>{return response.json()})
        .then(function (data) {
            amountOfResults = data["totalResults"];
            resultArray = data["Search"];
            //while (amountOfResults > 0) {
                resultArray.forEach(function(result) {
                    let promise1 = getMovieData(result.imdbID);
                    promise1.then(function(movie){
                        console.log('NEW MOVIE', movie)
                        movieArray.push(movie)
                    });
                })
        }).then( function() {
            console.log(movieArray);
            resolve(movieArray);
        }).catch(function(error) {
            reject(error);
        })
    })
}

function getMovieData(movieID) {
    return new Promise((resolve, reject) => {
        result = new movie();
        console.log('SEARCHING FOR MOVIE', movieID)
        url="https://www.omdbapi.com/?apikey=trilogy&i=" + movieID
        fetch(url,{method:"GET"}).then(response=>{return response.json()})
        .then(function (data) {
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


var promise = searchTitle(movieID,1)

promise.then(function(movieArray) {
    movieArray.forEach(function(movie){

    console.log(movie)

    var resultDiv = document.createElement("div");
    resultDiv.className = "col-md-4";
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
    tittleEl.textContent = movie.tittle;
    summaryEl = document.createElement("p");
    summaryEl.textContent = movie.plot;
    textWrapper.appendChild(tittleEl).append(summaryEl);
    resultDiv.appendChild(textWrapper);
=======


