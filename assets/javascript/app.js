// Firebase variables
var config = {
  apiKey: "AIzaSyCcnhW2HKL7odkcP1KpkX2aW5E-GDVHPYw",
  authDomain: "gainzandgrains-1508352019290.firebaseapp.com",
  databaseURL: "https://gainzandgrains-1508352019290.firebaseio.com",
  projectId: "gainzandgrains-1508352019290",
  storageBucket: "gainzandgrains-1508352019290.appspot.com",
  messagingSenderId: "436760734338"
};
firebase.initializeApp(config);
var database = firebase.database();
var users = "";
var clicks;
var clickCounter;

$(window).on("load", function() {
  database.ref().on("value", function(childSnapshot, prevChildKey) {
    clickCounter = childSnapshot.val().totalSearches;
  });
});


// ---------------------------------------

var map;
var city;
var service;
var infowindow;
var resultsArray = [];
var phoneNumberArray = [];
var userGym = {
  lat: 30.2672,
  lng: -97.7431
};

function displayMap() {
  document.getElementById('map').style.display = "block";
  document.getElementById('results2').style.display = "block";
  initMap();
  clickCounter++;
  database.ref().set({
    totalSearches: clickCounter
  });
}

function initMap() {
  userGym = {
    lat: userGym.lat,
    lng: userGym.lng
  }; //What we replace with what we type into the search bar

  map = new google.maps.Map(document.getElementById('map'), {
    center: userGym,
    zoom: 15
  });


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);



  // Bias the SearchBox results towards current map's viewport.
  // map.addListener('bounds_changed', function() {
  //   searchBox.setBounds(map.getBounds());
  // });

  map.setCenter(userGym);
  // $("#map").hide();


  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {


    // var mapLoad = document.getElementById('map');
    displayMap();

    var places = searchBox.getPlaces();

    console.log(places);
    // city = places[0].address_components[4].long_name + "," + places[0].address_components[6].long_name;
    // weather();

    var markers = [];
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    var newLat = places[0].geometry.viewport.f.b;
    var newLong = places[0].geometry.viewport.b.b;
    userGym = {
      lat: newLat,
      lng: newLong
    };

    service.nearbySearch({
      location: userGym,
      type: ['bar'],
      rankBy: google.maps.places.RankBy.DISTANCE
    }, callback);

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


    weather();
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

  console.log(resultsArray);



  $(".resultsContainer").empty();

  for (var i = 0; i < resultsArray.length; i++) {

    var name = $("<div>").append(resultsArray[i].name).addClass("resultName");
    var rating = $("<div>").append("Rating: " + resultsArray[i].rating + " / 5").addClass("resultRating");
    var vicinity = $("<div>").append(resultsArray[i].vicinity).addClass("resultVicinity");
    var priceLevel = $("<div>").append("Price: " + resultsArray[i].price_level).addClass("resultPrice");
    var hr = $("<hr>").addClass("resultHR");

    var newDiv = $("<div>").addClass("resultsDiv");



    newDiv.append(name);
    newDiv.append(vicinity);
    newDiv.append(rating);
    // newDiv.append(priceLevel);
    newDiv.append(hr);

    $(".resultsContainer").append(newDiv);

  }
  resultsArray = [];
}


function weather() {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + userGym.lat + "&lon=" + userGym.lng + "&appid=850bd46a652d4b267496f1dd05231bce";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .done(function(response) {
      console.log(response);
      var desc = response.weather[0].description;
      desc = desc.charAt(0).toUpperCase() + desc.slice(1); //capitilzeds the first letter
      var weather = desc + " " + Math.ceil(parseInt(response.main.temp) * 1.8 - 459.67) + "&deg F";
      $(".weatherDiv").html(weather);
    });

}
