"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var plantCtr = (function () {
    // ==== class variables ====
    var CANVAS_W = 800;
    var CANVAS_H = 100;

    var x = 0;
    var dx = 10;

    var con = document.getElementById("plane").getContext("2d");

    var image = new Image();
    image.src = "https://img.clipartxtras.com/7a99f4b3b6998c86b57a292aac76d4fa_airport-airports-icon-036430-icons-etc-white-airplane-clipart-no-background_512-512.png";

    // ==== functions ====

    var draw = function () {
        con.clearRect(0, 0, CANVAS_W, CANVAS_H);

        if (x > 800) x = 0;

        con.save();

        con.drawImage(image, x, 0, 100, 100);
        x += dx
        con.restore();
    };

    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        draw: draw
    };
})();

// ==== onload --> call the following functions ====
setInterval(plantCtr.draw, 1000/30);
