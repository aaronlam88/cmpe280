"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var plantCtr = (function () {
    // "global var"
    var CANVAS_W = 1000;
    var CANVAS_H = 200;
    var IMAGE_W = 100;
    var IMAGE_H = 100;

    var x = 0;
    var dx = 10;

    var con = document.getElementById("canvas").getContext("2d");

    var image = new Image();
    image.src = "https://img.clipartxtras.com/7a99f4b3b6998c86b57a292aac76d4fa_airport-airports-icon-036430-icons-etc-white-airplane-clipart-no-background_512-512.png"

    var draw = function () {
        con.strokeStyle = "white";
        con.fillStyle = "white";
        con.fillRect(0, 0, CANVAS_W, CANVAS_H);
        con.strokeRect(0, 0, CANVAS_W, CANVAS_H);

        if (x > 800) x = 0;

        con.save();

        con.drawImage(image, x, 0, IMAGE_W, IMAGE_H);
        x += dx
        con.restore();
    }

    // make func
    return {
        draw: draw
    }
})();

setInterval(plantCtr.draw, 1000/30);
