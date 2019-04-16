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

var root=database.ref();
var user = database.ref().push();
var userKey = user.key;


document.querySelector("#run-search").addEventListener("click", function(event) {
    event.preventDefault();

    var search = document.querySelector("#search-title").value;
    console.log(search);

    searchTitle(search,1);
    searchGoogleBooks(search);
    searchMarvelApi(search);
})

user.on("child_added",function(childSnap) {
    childData = childSnap.val();

    console.log("TITTLE:",childData.Title);
    console.log("TYPE:",childData.Type);
    console.log("+++++++++++++++++");

    var resultDiv = document.createElement("div");
    resultDiv.className = 'card d-flex';
    resultDiv.setAttribute('data-type',childData.Type);

    var imgWrapper = document.createElement("div")        
    imgWrapper.className = "col-md-4";
    var imgEl = document.createElement("img");
    imgEl.setAttribute('src',childData.Poster);
    imgWrapper.appendChild(imgEl)
    resultDiv.appendChild(imgWrapper);
            
    var textWrapper = document.createElement("div");
    textWrapper.className = "col-md-8";
    var tittleEl = document.createElement("div");
    tittleEl.className = "h2";
    tittleEl.textContent = childData.Title;
    textWrapper.appendChild(tittleEl);
    if (childSnap.Type == "comic") {
        var dateEl = document.createElement("p")
        dateEl.textContent = "Published Date: "+childData.PublishedDate
        textWrapper.append(dateEl)
    } else {
        var summaryEl = document.createElement("p");
        summaryEl.textContent ="Summary: " + childData.Plot;
        textWrapper.append(summaryEl);
        var dateEl = document.createElement("p");
        dateEl.textContent = "Year: "+childData.Year;
    }
    resultDiv.appendChild(textWrapper);

    document.querySelector("#result-section").appendChild(resultDiv);
})
