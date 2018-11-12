"use strict";

// name your object same as your file name
// wrap all your functions in a object for closure and avoid namespace collision
// include the javascript file in the correct pug file that need this javascript
// think of this as your class (in ES6 we will have class)
var dashboard2 = (function () {
    // ==== class variables ====
    // current root url
    var currentURL = window.location.protocol;
    // local cache for mapData
    var _mapData = [];

    // ==== functions ====
    function init() {
        var request = { "collection": "hotel_review", "data": {} };
        postData(`${currentURL}/mongodb/find`, request, 'dataIsReady', run);
    }

    /**
     * make a get request to url
     * create a listen to listen to data return with id
     * when data is return, call the function callback
     * @param {String} url post to url
     * @param {String} id listener id
     * @param {Function} callback function to be executed
     */
    function getData(url, id, callback) {
        api.get(url, id);
        window.addEventListener(id, (event) => callback(event.data));
    }

    /**
     * make a post request to url
     * with request body (JSON object) request
     * create a listen to listen to data return with id
     * when data is return, call the function callback
     * @param {String} url post to url
     * @param {JSON} request post request body
     * @param {String} id listener id
     * @param {Function} callback function to be executed
     */
    function postData(url, request, id, callback) {
        api.post(url, request, id);
        window.addEventListener(id, (event) => callback(event.data));
    }

    /**
     * the main function for this class, when data is ready, this function should run
     * @param {JSON} respond {status: 'OK' | 'ERROR', message: String, data: Array}
     */
    function run(respond) {
        // error handling
        // TODO: show error on UI
        if (respond.status !== 'OK') {
            window.location.href = `${currentURL}/error`;
            console.log("Data ERROR");
            return;
        }
        var rawData = respond.data;

        initAvgRatingHeatMap(rawData);
        initAvgRatingBarChart(rawData);
    }

    function initAvgRatingBarChart(rawData) {
        var mapData = getMapData_AvgRating(rawData);
        // sort data by value
        mapData.sort((a, b) => { return b.value - a.value });
        renderVerticalBarChart(mapData, 'avgRatingVerticalBarChart');
        renderHorizontalBarChart(mapData, 'avgRatingHorizontalBarChart');
    }

    function initAvgRatingHeatMap(rawData) {
        var mapData = getMapData_AvgRating(rawData);
        renderUSMap(mapData, 'US-headMap');
    }

    function getMapData_AvgRating(rawData) {
        // return local cache
        if (_mapData && _mapData.length !== 0) {
            return _mapData;
        }
        // cache is empty, so go get data
        var ratingCount = {};
        rawData.forEach(element => {
            if (!element.country || !element.province || element.province.length != 2 || !element.reviews_rating) return;

            var location = `${element.country}-${element.province}`;
            ratingCount[location] = ratingCount[location] || {};
            ratingCount[location]['sum'] = (ratingCount[location]['sum'] || 0) + parseInt(element.reviews_rating);
            ratingCount[location]['count'] = (ratingCount[location]['count'] || 0) + 1;
        });

        for (const key in ratingCount) {
            _mapData.push({
                id: key,
                value: (ratingCount[key]['sum'] / ratingCount[key]['count']).toFixed(2),
                title: (ratingCount[key]['sum'] / ratingCount[key]['count']).toFixed(2)
            })
        }
        ratingCount = null;
        return _mapData;
    }

    /**
     * 
     * @param {Array} data 
     * @param {String} field 
     */
    function getMinMax(data, field) {
        var array = [];
        try {
            data.forEach(element => { array.push(element[field]) });
        } catch (error) {
            array = data;
        }
        console.log
        return {
            min: Math.min(...array),
            max: Math.max(...array)
        }
    }

    /**
     * draw a US heat map with mapData to a div with id divId
     * @param {Array} mapData array of json objects, ex: {id: "US-WI", value: 23}
     * @param {String} divId the id of the div should the map render to
     */
    function renderUSMap(data, divId) {
        var { min, max } = getMinMax(data, 'value');
        AmCharts.makeChart(divId, {
            type: "map",
            theme: "light",
            colorSteps: 10,

            dataProvider: {
                map: "usaLow",
                areas: data
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
    }

    function renderVerticalBarChart(data, divId, valueField = "value", categoryField = "id") {
        AmCharts.makeChart(divId, {
            type: "serial",
            theme: "light",
            dataProvider: data,
            valueAxes: [{
                gridAlpha: 0.2,
                dashLength: 0
            }],
            gridAboveGraphs: true,
            startDuration: 1,
            graphs: [{
                fillAlphas: 0.8,
                lineAlpha: 0.2,
                type: "column",
                valueField: valueField,
            }],
            chartCursor: {
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                zoomable: false
            },
            categoryField: categoryField,
            categoryAxis: {
                gridPosition: "start",
                gridAlpha: 0,
                tickPosition: "start"
            }
        });
    }

    function renderHorizontalBarChart(data, divId, valueField = "value", categoryField = "id") {
        AmCharts.makeChart(divId, {
            type: "serial",
            theme: "light",
            rotate: true,
            dataProvider: data,
            valueAxes: [{
                gridAlpha: 0.2,
                dashLength: 0
            }],
            gridAboveGraphs: true,
            startDuration: 1,
            graphs: [{
                fillAlphas: 0.8,
                lineAlpha: 0.2,
                type: "column",
                valueField: "value"
            }],
            chartCursor: {
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                zoomable: false
            },
            categoryField: "id",
            categoryAxis: {
                gridPosition: "start",
                gridAlpha: 0,
                tickPosition: "start"
            }
        });
    }

    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init
    }
})();

// ==== onload --> call the following functions ====
dashboard2.init();
