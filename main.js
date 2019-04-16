var config = {
    apiKey: "AIzaSyA8kEgnv75jLgZznRXBSpD7FGHd0ulv8Jo",
    authDomain: "project-one-7cd8f.firebaseapp.com",
    databaseURL: "https://project-one-7cd8f.firebaseio.com",
    projectId: "project-one-7cd8f",
    storageBucket: "project-one-7cd8f.appspot.com",
    messagingSenderId: "147656414734"
};
firebase.initializeApp(config);
  
var bookData = firebase.database();

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
