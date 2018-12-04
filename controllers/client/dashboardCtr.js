"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
let dashboardCtr = (function () {
    // ==== class variables ====

    // ==== functions ====
    function init() {
        graph.init();

        graph.drawUSMap('us-heatmap');
        graph.drawAllReviewRakingChart('us-rating');
        graph.drawAllReviewTrend('us-trendline');
        graph.drawRatingLinesChart('rating-line');

        graph.drawAllReviewRakingChart('us-rating');
        graph.drawAllReviewTrend('us-trendline');
        graph.drawRatingLinesChart('rating-line');

    }

    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init
    }
})();

// ==== onload --> call the following functions ====
dashboardCtr.init()
