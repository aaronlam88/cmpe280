"use strict"; // to avoid bad JavaScript code https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode


var dataAPI = (function () {
    // ==== class variables ====
    var currentURL = 'http://' + window.location.hostname + ':' + window.location.port;
    var rawData = undefined;

    function init() {
        api.jQueryPost(currentURL + '/mongodb/find', {collection: 'hotel_review', data: {}}, 'dataIsReady');

        window.addEventListener('dataIsReady', (event) => dataIsReady(event));
    }

    function dataIsReady(data) {
        if(data.status === 'ERROR') {
            console.log(data.message);
        }
        rawData = data.data;
    }

    /**
     * 
     */
    function drawUSMap(triggeredByEvent) {
        if(!rawData && !triggeredByEvent) {
            window.addEventListener('dataIsReady', () => drawUSMap(true));
            return;
        }
        if(triggeredByEvent) {
            window.removeEventListener('dataIsReady', drawUSMap());
        }

        console.log('drawUSMap');
    }
    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init,
        drawUSMap: drawUSMap
    }
})();

dataAPI.init();
dataAPI.drawUSMap();