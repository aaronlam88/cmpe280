"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var GoogleMap = function (x, y, z) {
      var location = {lat: x, lng: y};

      var map = new google.maps.Map(document.getElementById("googleMap"), {
        center : location,
        zoom : z
      });

      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.textSearch({
        location: location,
        radius: 500,
        query: 'hotel'
      }, callback);

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
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
};
