
  $(document).ready(function () {
    var queryURL = "https://www.googleapis.com/auth/books";
    

    var queryParams = { "key": "AIzaSyDdmjf7LgmZgcvxYZ4QPa7-3sbSwmc8MSo" };

    $("#myForm").submit(function () {
      var search = $("#search").val();
      if (search == '') {
        alert("enter something on field");
      }
      else {
        var summary = '';
        var img = '';
        var title = '';
        var rating = '';
        var creator = '';

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
        });

      }
    })
  })         
  $("#run-search").on("click", function (event) {
    event.preventDefault();
  });

