// Initialize firebase
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

function searchGoogleBooks(books){
  var queryParams = { "key": "AIzaSyDdmjf7LgmZgcvxYZ4QPa7-3sbSwmc8MSo" }; 

  var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + books;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // response.items[0].volumeInfo.title
    console.log(response);
    for (var i = 0; i < response.items.length; i++) {
      // console.log(response.items[i]);
      // console.log(response.items[i].volumeInfo.title);
      // console.log("authors: " +response.items[i].volumeInfo.authors);
      // console.log("rating: "+response.items[i].volumeInfo.averageRating);
      // console.log("description: " +response.items[i].volumeInfo.description);
      // console.log("image: " +response.items[i].volumeInfo.imageLinks.thumbnail);
      var bookInfo = {
        title: response.items[i].volumeInfo.title,
        authorName: response.items[i].volumeInfo.authors,
        rating: response.items[i].volumeInfo.averageRating,
        description: response.items[i].volumeInfo.description,
        imageUrl: response.items[i].volumeInfo.imageLinks.thumbnail
      }
      console.log("book Info: " +bookInfo);
      // here we are saving the bookInfo to the firebase
      bookData.ref().push(bookInfo);
    }
  })
}
bookData.ref().on("child_added", function(childsnapshot,prevChildkey){
  // this is grabbing data from firebase
  var title = childsnapshot.val().title;
  var authorName = childsnapshot.val().authorName;
  var rating = childsnapshot.val().rating;
  var description = childsnapshot.val().description;
  var imageUrl = childsnapshot.val().imageUrl;
  $("#booksTable > tbody").append(
    $("<tr>").append(
      $("<td>").text(title),
      $("<td>").text(authorName),
      $("<td>").text(rating),
      $("<td>").text(description),
      $("<td>").text(imageUrl)
    )
  )

})


$("#run-search").on("click", function (event) {
  event.preventDefault();
  var inputBook = $("#search-title").val();
  console.log(inputBook)
  inputBook = inputBook.split(" ").join("+");
  searchGoogleBooks(inputBook)
}); 


