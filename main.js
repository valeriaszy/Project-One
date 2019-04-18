//Firebase initialize
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
//End Firebase initilize

//Asign value to databse path
var root=database.ref();

//condition to check for user in local storage
if (!localStorage.getItem("geekverse-key")) {//condition 1: new user
    var user = database.ref().push(); //to add a new user and save his reference
    var userKey = user.key; //to store userkey
    localStorage.setItem("geekverse-key",userKey)
} else {
    var userKey = localStorage.getItem("geekverse-key");
    var user = database.ref("/"+userKey);
}

function clearPreviousSearch() {
    //removing current user (also the whole branch)
    user.remove().then( function() {
        resultNode = document.querySelector("#result-section");
        while(resultNode.firstChild) {
            resultNode.removeChild(resultNode.firstChild);
        }
    })
    //re-add user
    var child = root.push();
    child.key = userKey;
}

document.querySelector("#run-search").addEventListener("click", function(event) {
    event.preventDefault();

    clearPreviousSearch();

    var search = document.querySelector("#search-title").value;
    console.log(search);
    
    //function for searching movie
    searchTitle(search);
    
    //function for search book
    searchGoogleBooks(search);

    //funcitoin for search comic
    searchMarvelApi(search);
})

user.on("child_added",function(childSnap) {// launch call back function to display the firebase data locally)
    childData = childSnap.val();

    var resultDiv = document.createElement("div");
    resultDiv.className = 'card my-1';
    resultDiv.setAttribute('data-type',childData.Type);
    
    //for title area
    var titleRow = document.createElement("div");
    titleRow.className = "card-header";
    var titleEl = document.createElement("div");
    titleEl.className = "h2";
    titleEl.textContent = childData.Title;
    titleRow.appendChild(titleEl);
    resultDiv.appendChild(titleRow);

    //for body area
    var bodyRow = document.createElement("div");
    bodyRow.className = "card-body d-flex flex-row";
    var imgWrapper = document.createElement("div")        
    imgWrapper.className = "col-md-4";
    var imgEl = document.createElement("img");
    imgEl.className = "img-fluid rounded-0";
    imgEl.setAttribute("width","100%");
    imgEl.setAttribute('src',childData.Poster); 
    imgWrapper.appendChild(imgEl)
    bodyRow.appendChild(imgWrapper);
            
    var textWrapper = document.createElement("div");
    textWrapper.className = "col-md-8";
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
    bodyRow.appendChild(textWrapper);
    resultDiv.appendChild(bodyRow)

    document.querySelector("#result-section").appendChild(resultDiv);
})
