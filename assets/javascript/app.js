<<<<<<< HEAD
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
=======
// This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  var map;
  var infowindow;
  var resultsArray = [];

  function initMap() {
    var pyrmont = {
      lat: 30.2672,
      lng: -97.7431
    }; //What we replace with what we type into the search bar

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 1000,
      type: ['bar']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        resultsArray.push(results[i]);
      }
    }
    createResultItems();
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  function createResultItems() {

    for (var i = 0; i < resultsArray.length; i++) {

      var name = resultsArray[i].name;
      var rating = resultsArray[i].rating;

      var newDiv = $("<div>");
      newDiv.append(name);
      newDiv.append(rating);

      $(".resultsContainer").append(newDiv);

    }
  }
>>>>>>> 64896000d600a0086cf69f43dbcb5a57fcd9bd07
