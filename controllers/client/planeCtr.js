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

    var millisecondPerFrames = 1000 / 24;
    // ==== functions ====

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function init() {
        resizeCanvas();
        var redraw = debounce(resizeCanvas, 250);
        window.addEventListener('resize', redraw);
    }

    var run;
    function resizeCanvas() {
        clearInterval(run);

        CANVAS_W = document.getElementById('canvasWrapper').offsetWidth;
        CANVAS_H = 100;
        canvas.width = CANVAS_W;
        canvas.height = CANVAS_H;

        run = setInterval(draw, millisecondPerFrames);
    }

    function draw() {
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
