"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var googleMap = (function () {
    // ==== class variables ====

    // ==== functions ====
    function mapInit() {
        var mapProp = {
            center: new google.maps.LatLng(37.3351916, -121.8832655),
            zoom: 12,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: mapInit
    }
})();

// ==== onload --> call the following functions ====
