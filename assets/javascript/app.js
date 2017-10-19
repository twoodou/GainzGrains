
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




