"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)

/**
 * an api to get data
 */
var api = (function () {
    // ==== class variables ====

    // ==== functions ====
    /**
     * get data from backend server using jQuery get
     * will do window.dispatchEvent(eventID)
     * to get the data, use window.addEventListener(url, (event) => {handle return data})
     * @param {String} url url to get data from
     * @param {String} eventID the eventID that should be emitted when data return
     */
    function jQueryGet(url, eventID) {
        $.ajax({
            url: url,
            success: function (result) {
                let event = new Event(eventID);
                event.data = result;
                window.dispatchEvent(event);
            }
        })
    }

    /**
     * get data from backend server using jQuery post
     * will do window.dispatchEvent(eventID)
     * to get the data, use window.addEventListener(url, (event) => (handle return data))
     * @param {String} url url to get data from
     * @param {String} eventID the eventID that should be emitted when data return
     */
    function jQueryPost(url, data, eventID) {
        $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (result) {
                    let event = new Event(eventID);
                    event.data = result;
                    window.dispatchEvent(event);
                }
            })
    }

    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        jQueryGet: jQueryGet,
        jQueryPost: jQueryPost
    }
})();

// ==== onload --> call the following functions ====