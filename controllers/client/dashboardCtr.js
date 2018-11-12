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
    var currentURL = 'http://' + window.location.hostname + ':' + window.location.port;

    // ==== event listeners ====
    window.addEventListener('table', (event) => drawTable(event.data));
    window.addEventListener('hotel_review', (event) => drawDashboard(event.data));

    // ==== functions ====
    function init() {
        // getData(currentURL + '/api/mockusers');
        getReviewData();
    }

    function getReviewData() {
        if(this.reviewData) {
            drawDashboard();
        }

        var data = { "collection": "hotel_review", "data": {} };
        api.jQueryPost(currentURL + '/mongodb/find', data, 'hotel_review');
    }

    function getData(url) {
        api.jQueryGet(url, 'table');
    }

    function drawTable(data) {
        // create table header
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        for (var key in data[0]) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(key.toLocaleUpperCase()))
            tr.appendChild(th);
        }
        table.appendChild(thead.appendChild(tr));
        // create table body
        var tbody = document.createElement('tbody');
        for (var i = 0, len = data.length; i < len; ++i) {
            tr = document.createElement('tr');
            for (var key in data[i]) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(data[i][key]))
                tr.appendChild(td)
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
    }

    function drawDashboard(event) {
        this.reviewData = event.data || this.reviewData;
        this.reviewData = rawData;
        drawMap(rawData);

    }

    

    function drawMap(rawData) {
        var mapData = {};
        mapData['US-VT'] = {};
        mapData['US-VT']['sum'] = 0;
        mapData['US-VT']['count'] = 0;
        rawData.forEach(element => {
            if (!element.province || !element.reviews_rating) return;

            var location = `${element.country}-${element.province}`;
            mapData[location] = mapData[location] || {};
            mapData[location]['sum'] = (mapData[location]['sum'] || 0) + parseInt(element.reviews_rating);
            mapData[location]['count'] = (mapData[location]['count'] || 0) + 1;
        });
        var areas = [];
        var min = 0;
        var max = 0;
        for (const key in mapData) {
            const value = (mapData[key].sum / mapData[key].count || 0).toFixed(2);
            areas.push({
                id: key,
                value: value,
                title: value
            })
            if (value < min) {
                min = value;
            } else if (value > max) {
                max = value;
            }
        }

        AmCharts.makeChart("us-rating-map", {
            titles: [
                { text: "Avg Review Rating by State" }
            ],
            type: "map",
            theme: "light",
            colorSteps: 10,
            panEventsEnabled: true,
            dataProvider: {
                map: "usaLow",
                areas: areas
            },

            areasSettings: {
                autoZoom: true
            },

            valueLegend: {
                right: 10,
                minValue: min,
                maxValue: max
            }
        });
        document.getElementById("us-rating-map").style.height = "500px";
    }

    function drawLine(rawData) {

    }

    function drawVerticalBar(rawData) {

    }


    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init
    }
})();

// ==== onload --> call the following functions ====
dashboard.init();
