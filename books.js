function searchGoogleBooks(books){
  //var queryParams = { "key": "AIzaSyDdmjf7LgmZgcvxYZ4QPa7-3sbSwmc8MSo" }; --function ?

  var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + books;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("FINISH SEARCHING FOR BOOKS:",books);
    for (var i = 0; i < response.items.length; i++) {
      var bookInfo = {
        Type:"book",
        Title: response.items[i].volumeInfo.title,
        Author: response.items[i].volumeInfo.authors,
        Rating: response.items[i].volumeInfo.averageRating,
        Plot: response.items[i].volumeInfo.description,
        Poster: response.items[i].volumeInfo.imageLinks.thumbnail,
        Year:response.items[i].volumeInfo.publishedDate
      }
      console.log("book Info: " +bookInfo);
      user.push(bookInfo);
    }
  })
}



