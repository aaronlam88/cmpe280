"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var mongodbCtr = (function () {
    // ==== class variables ====
    var currentURL = 'http://' + window.location.hostname + ':' + window.location.port;
    var error = {
        collection: 'Missing collection!',
        jsonObject: 'Data is not a JSON object!',
        arrayObject: 'Data is not an array of JSON!'
    }

    window.addEventListener('dataIsReady', (event) => dataIsReady(event.data));

    // ==== functions ====
    function getFormData($form) {
        var data = undefined
        try {
            data = $form.serializeArray().reduce(function (obj, item) {
                if (item.name !== 'collection') {
                    if(item.value.length === 0) {
                        obj[item.name] = {}
                    } else {
                        obj[item.name] = JSON.parse(item.value);
                    }
                } else {
                    obj[item.name] = item.value;
                }
    
                return obj;
            }, {});
            return data
        } catch (error) {
            return data;
        }
    }

    function insert() {
        var $form = $("#insert");
        var data = getFormData($form);
        if(!data) {
            dataIsReady(`${error.collection} OR ${error.arrayObject}`);
            return;
        }
        api.jQueryPost(currentURL + '/mongodb/insert', data, 'dataIsReady')
    }

    function find() {
        var $form = $("#find");
        var data = getFormData($form);
        if(!data) {
            dataIsReady(`${error.collection} OR ${error.jsonObject}`);
            return;
        }
        api.jQueryPost(currentURL + '/mongodb/find', data, 'dataIsReady')
    }

    function remove() {
        var $form = $("#remove");
        var data = getFormData($form);
        if(!data) {
            dataIsReady(`${error.collection} OR ${error.jsonObject}`);
            return;
        }
        api.jQueryPost(currentURL + '/mongodb/findAndRemove', data, 'dataIsReady')
    }

    function update() {
        var $form = $("#update");
        var data = getFormData($form);
        if(!data) {
            dataIsReady(`${error.collection} OR ${error.jsonObject}`);
            return;
        }
        api.jQueryPost(currentURL + '/mongodb/update', data, 'dataIsReady')
    }

    function dataIsReady(data) {
        console.log(data);
        document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);
    }

    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        insert: insert,
        find: find,
        remove: remove,
        update: update
    }
})();

// ==== onload --> call the following functions ====
