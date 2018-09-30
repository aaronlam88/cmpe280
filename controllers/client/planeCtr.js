"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var plantCtr = (function () {
    // ==== class variables ====
    var CANVAS_W;
    var CANVAS_H;

    var x = 0;
    var dx = 8;

    var canvas = document.getElementById("plane");
    var context = canvas.getContext("2d");

    var image = new Image();
    image.src = "images/plane.png";

    var millisecondPerFrames = 1000/24;
    var run;
    // ==== functions ====
    var init = function() {
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
    }

    var resizeCanvas = function () {
        clearInterval(run);
        
        CANVAS_W = document.getElementById('canvasWrapper').offsetWidth;
        CANVAS_H = 100;
        canvas.width = CANVAS_W;
        canvas.height = CANVAS_H;

        run = setInterval(draw, millisecondPerFrames);
    }

    var draw = function () {
        context.clearRect(0, 0, CANVAS_W, CANVAS_H);

        if (x > CANVAS_W) x = 0;

        context.save();

        context.drawImage(image, x, 0, 100, 100);
        x += dx
        context.restore();
    };

    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init
    };
})();

// ==== onload --> call the following functions ====
plantCtr.init();
