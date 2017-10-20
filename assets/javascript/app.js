<<<<<<< HEAD

var yelpApiKey = qAIGl2TCR9k7aJlQZtZu5g;
var yelpAPI = "https://api.yelp.com/v3/businesses/qAIGl2TCR9k7aJlQZtZu5g";

var zomaptoAPIKey = 9e0e6de51e155e3fec22b0bf929130c9

/*
what we will need to store in our firebase
 - number of people that have used the app/ sue it that day
 -store the person's last searched gym to auto populate the breweries nearby


Get the AuthProvider object that corresponds to the provider you want to link to the user's account. Examples:
var provider = new firebase.auth.GoogleAuthProvider();
var provider = new firebase.auth.FacebookAuthProvider();


To sign in with a pop-up window, call linkWithPopup:
auth.currentUser.linkWithPopup(provider).then(function(result) {
  // Accounts successfully linked.
  var credential = result.credential;
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  // ...
});

 */


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCcnhW2HKL7odkcP1KpkX2aW5E-GDVHPYw",
    authDomain: "gainzandgrains-1508352019290.firebaseapp.com",
    databaseURL: "https://gainzandgrains-1508352019290.firebaseio.com",
    projectId: "gainzandgrains-1508352019290",
    storageBucket: "gainzandgrains-1508352019290.appspot.com",
    messagingSenderId: "436760734338"
  };
  firebase.initializeApp(config);


var users: "";
var searched: "";




=======
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
}
>>>>>>> 0d532ac76e3d1966bf0fa604b5366094a8244374
