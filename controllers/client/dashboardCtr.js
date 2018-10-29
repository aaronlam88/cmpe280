"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var dashboard = (function () {
    // ==== class variables ====
    var container = document.getElementById('userTable');
    var table = document.createElement('table');
    table.classList.add('alt')
    var currentURL = 'http://' + window.location.hostname +':' + window.location.port;
    // ==== functions ====
    function init() {
        getData(currentURL + '/api/mockusers');
    }

    function getData(url) {
        api.jQueryGet(url, 'table');
        window.addEventListener('table', (event) => drawTable(event.data));
    }

    function drawTable(data) {
        // create table header
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        for(var key in data[0]) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(key.toLocaleUpperCase()))
            tr.appendChild(th);
        }
        table.appendChild(thead.appendChild(tr));
        // create table body
        var tbody = document.createElement('tbody');
        for(var i = 0, len = data.length; i < len; ++i) {
            tr = document.createElement('tr');
            for(var key in data[i]) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(data[i][key]))
                tr.appendChild(td)
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
    }
    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init
    }
})();

// ==== onload --> call the following functions ====
dashboard.init();