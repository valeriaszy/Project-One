var database = firebase.database;
var root = database.ref();
var resultsData = database.ref('/result');
var listData = database.ref('/list');

document.querySelector("#run-search").addEventListener("click", function(event) {
    event.preventDefault();
    var search = document.querySelector("#search-title").value;
    console.log(search);

    searchTitle(search,1).then(function (arr) {
        setTimeout( function() {
            arr.forEach(function(e) {
                displayMovie(e);
            })
            return arr;
        },500)
    })
})
