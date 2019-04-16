var config = {
    apiKey: "AIzaSyA8kEgnv75jLgZznRXBSpD7FGHd0ulv8Jo",
    authDomain: "project-one-7cd8f.firebaseapp.com",
    databaseURL: "https://project-one-7cd8f.firebaseio.com",
    projectId: "project-one-7cd8f",
    storageBucket: "project-one-7cd8f.appspot.com",
    messagingSenderId: "147656414734"
};
firebase.initializeApp(config);
  
var database = firebase.database();

var user = database.ref().push();
var userKey = user.key();


document.querySelector("#run-search").addEventListener("click", function(event) {
    event.preventDefault();
    var search = document.querySelector("#search-title").value;
    console.log(search);

    searchTitle(search,1);
    searchGoogleBooks(search);
    searchMarvelApi(search);
})
