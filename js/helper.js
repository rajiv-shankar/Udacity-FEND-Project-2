/*
This file contains all of the code running in the background that makes resumeBuilder.js possible.
We call these helper functions because they support your code in this course.
Don't worry, you'll learn what's going on in this file throughout the course.
You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.
*/

// These are HTML strings. As part of the course, you'll be using JavaScript functions replace the %data% placeholder text you see in them.

var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<h4>%data%</h4><hr/>';                  // REPLACES <span> WITH <h4>

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<hr/><img src="%data%" class="biopic">';    // ADDED LINE ABOVE
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';
                                                              // following is for EACH project (can't have this in html as # of projects will vary)
var HTMLprojectStart = '<div class="project-entry"></div>';   // adds project-entry class (has padding CSS)
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Certificates</h3>';              // CHANGED
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button id="international">Internationalize</button>';
var googleMap = '<div id="map"></div>';

/* Required for Internationalize button */

$(document).ready(function() {
    $('#international').click(function() {
        var iName = inName($("#name").html()) || function() {};
        $('#name').html(iName);
    });
});

// The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.

clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {                             // CHANGED
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks(x,y);                                             // defined in [helper.js/72]
});

/* ======================================================================= MAP ======================================================================= */

/* Generate custom Google Map for the website. See: https://developers.google.com/maps/documentation/javascript/reference */

var map;                                          // declares a global map variable

function initializeMap() {                        // initializeMap() is called when page is loaded

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);  // to displaye googleMap append var to #mapDiv in resumeBuilder.js

  function locationFinder() {                     // returns array of every location string from the JSONs written for bio, education, and work

    var locations = [];                           // initializes an empty array

    locations.push(bio.contacts.location);        // adds the single location property from bio to the locations array

    for (var school in education.schools) {       // iterates through school locations and appends each location to the locations array
      locations.push(education.schools[school].location);
    }

    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);    // iterates through work locations and appends each location to the locations array
    }

    return locations;
  }

  function createMapMarker(placeData) {           // reads Google Places search results to create map pins

    var lat = placeData.geometry.location.lat();  // latitude from the place service (data from search result object saved to local variables)
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;       // name of the place from the place service
    var bounds = window.mapBounds;                // current boundaries of the map window

    var marker = new google.maps.Marker({         // additional data about the pin for a single location
      map: map,
      position: placeData.geometry.location,
      title: name,
      icon:"http://befirst.biz/clashofclans/COC-3/images/a17.png"  // REPLACED pin with icon
    });

    var infoWindow = new google.maps.InfoWindow({  // little helper windows that open on click/hover over pin; contains more information
      content: name
    });

    google.maps.event.addListener(marker, 'click', function() {  // Google Maps Events: what happens on click on pin
      infoWindow.open(map, marker);               // adds location label
      map.setZoom(9);                             // ADDED: zooms in
      map.setCenter(marker.getPosition());        // ADDED: centers
    });

    bounds.extend(new google.maps.LatLng(lat, lon));  // add pin to map. bounds.extend() takes in a map location object
    map.fitBounds(bounds);                        // fit the map to the new marker
    map.setCenter(bounds.getCenter());            // center the map
  }

  function callback(results, status) {            // makes sure search returned results for location, then creates new map marker for location
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  function pinPoster(locations) {  // takes locations array created by locationFinder() and fires off Google place searches for each location

    var service = new google.maps.places.PlacesService(map);  // creates Google place search. PlacesService actually searchs for location data

    for (var place in locations) {                // Iterates through the array of locations, creates a search object for each location

      var request = {                             // the search request object
        query: locations[place]
      };

      service.textSearch(request, callback);  // searches Google Maps API for location data, runs callback function with search results after each search
    }
  }

  window.mapBounds = new google.maps.LatLngBounds();  // Sets the boundaries of the map based on pin locations

  locations = locationFinder();                   // array of location strings returned from locationFinder()

  pinPoster(locations);                           // creates pins on map for each location in the locations array

}

window.addEventListener('load', initializeMap);   // Calls the initializeMap() function when the page loads
window.addEventListener('resize', function(e) {   // Vanilla JS way to listen for resizing of the window and adjust map bounds
map.fitBounds(mapBounds);                         //Make sure the map bounds get updated on page resize
});
