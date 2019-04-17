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
    })
        .done(function (response) {
            console.log(response)
            console.log(response.results)
            console.log(response.data.results)
            var results = response.data.results;
            //$('#result-section').append(results.toString());
            var resultsLen = results.length;

            for (var i = 0; i < resultsLen; i++) {
                if (results[i].images.length > 0) {
                    var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                    output += '<div style="display: inline-block; margin:5px"draggable="true"ondragstart="drag(event)"><img id="img" draggable="true"ondragstart="drag(event)" src="' + imgPath + '"><br>' + results[i].title + '<br></div>';
                }
            }
            
        });

   

}

$("#run-search").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    //Storing the Comic
    var inputComic = $("#search-title").val();
    console.log(inputComic)

    //Running the searchBandsInTown function(passing in the artist as an argument)
    searchMarvelApi(inputComic);
    // var results = (response.data.results);
    // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyCtvKNT7TjGHy9wN5aFVXFX0C_Kfz6-Qx0",
    //     authDomain: "marvelapi-a3afe.firebaseapp.com",
    //     databaseURL: "https://marvelapi-a3afe.firebaseio.com",
    //     projectId: "marvelapi-a3afe",
    //     storageBucket: "marvelapi-a3afe.appspot.com",
    //     messagingSenderId: "538840903221"
    // };
    // firebase.initializeApp(config);

    // var userInput = {
    //     results: results,
    //   };

    // var database = firebase.database;

    // console.log(inputComic)
    // database.ref().push(userInput)

});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}



// class App {

//     static init() {
  
//       App.img = document.getElementsByClassName('img')[0]
  
//       App.img.addEventListener("dragstart", App.dragstart)
//       App.img.addEventListener("dragend", App.dragend)
  
//       const containers = document.getElementsByClassName('card-body', 'card')
  
//       for(const container of containers) {
//         container.addEventListener("dragover", App.dragover)
//         container.addEventListener("dragenter", App.dragenter)
//         container.addEventListener("dragleave", App.dragleave)
//         container.addEventListener("drop", App.drop)
//       }
//     }
  
//     static dragstart() {
//       this.className += "img"
    
//       setTimeout(()=>this.className="invisible", 0)
//     }
  
//     static dragend() {
//       this.className = "img"
//     }
  
//     static dragover(e) {
//       e.preventDefault()
//     }
  
//     static dragenter(e) {
//       e.preventDefault()
//       this.className += " hovered"
//     }
  
//     static dragleave() {
//       this.className = "card-body", 'card'
//     }
  
//     static drop() {
//       this.className = "card-body", 'card'
//       this.append(App.img)
//     }
  
//   }
  
//   document.addEventListener("DOMContentLoaded", App.init)

