<<<<<<< HEAD
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
=======
var map;
var infowindow;
var resultsArray = [];
>>>>>>> 0d532ac76e3d1966bf0fa604b5366094a8244374

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
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
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

    var name = $("<div>").append(resultsArray[i].name).addClass("resultName");
    var rating = $("<div>").append(resultsArray[i].rating).addClass("resultRating");
    var vicinity = $("<div>").append(resultsArray[i].vicinity).addClass("resultPhoto");

    var newDiv = $("<div>");



    newDiv.append(name);
    newDiv.append(rating);
    newDiv.append(vicinity);

    $(".resultsContainer").append(newDiv);

  }
<<<<<<< HEAD
>>>>>>> 64896000d600a0086cf69f43dbcb5a57fcd9bd07
=======
}
>>>>>>> 0d532ac76e3d1966bf0fa604b5366094a8244374
