// Function for dumping the JSON content for each button into the div
      function displayResInfo() {

        var resturant = "Parkside";           //How far away it shows results This will eventually be a user input value...
        //30.2672° N, 97.7431° W
        var queryURL = 'https://developers.zomato.com/api/v2.1/search?q=' + resturant;



        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          $(".results").text(JSON.stringify(response));
          //renderButtons();
        });
      }

      displayResInfo();
