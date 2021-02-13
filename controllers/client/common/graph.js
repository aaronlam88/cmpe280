"use strict"; // to avoid bad JavaScript code https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
var states = ['Oregon', 'California', 'Utah', 'Idaho', 'Alaska'];
var count = Array(5).fill(0);
var rawData = undefined;

let graph = (function () {
    // ==== class variables ====
    let currentURL = 'http://' + window.location.hostname + ':' + window.location.port;
    let rawData = undefined;
    let statName = undefined;


    let _USMapData = undefined;
    let _USRatingData = undefined;
    let _ReviewCountPerDate = undefined;
    let _MostRatedState = undefined;
    let _HighestRatedState = undefined;
    let _LowestRatedState = undefined;

    function init(query = {}) {

        api.jQueryGet(currentURL + '/api/state-name', 'stateNameIsReady');
        api.jQueryPost(currentURL + '/mongodb/find', { collection: 'hotel_review', data: query }, 'dataIsReady');
        window.addEventListener('stateNameIsReady', (event) => stateNameIsReady(event));
        window.addEventListener('dataIsReady', (event) => dataIsReady(event));
    }


    function init(query = {}) {

        api.jQueryGet(currentURL + '/api/state-name', 'stateNameIsReady');
        api.jQueryPost(currentURL + '/mongodb/find', { collection: 'hotel_review', data: query }, 'dataIsReady');
        window.addEventListener('stateNameIsReady', (event) => stateNameIsReady(event));
        window.addEventListener('dataIsReady', (event) => dataIsReady(event));
    }

    function stateNameIsReady(event) {
        statName = event.data;
    }

    function dataIsReady(event) {
        if (event.status === 'ERROR') {
            console.log(event.message);
        }
        rawData = event.data;
    }

    function getUSMapData() {
        if(!rawData) {
            window.addEventListener('dataIsReady', () => getUSMapData());
            return;
        }
        if(_USMapData) {
            return _USMapData;
        }
        // TODO: handle error
        if(rawData.status !== 'OK') {
            return;
        }

        let mapData = {};
        mapData['US-VT'] = {};
        mapData['US-VT']['sum'] = 0;
        mapData['US-VT']['count'] = 0;

        let maxCount = 0;
        let maxRating = 0;
        let minRating = 0;
        rawData.data.forEach(element => {
            if (!element.province || !element.reviews_rating) return;
            let temp = element.province.toUpperCase();
            switch(temp) {
                case 'OR':
                  count[0]++;
                  break;
                case 'CA':
                  count[1]++;
                  break;
                case 'UT':
                  count[2]++;
                  break;
                case 'ID':
                  count[3]++;
                  break;
                case 'AK':
                  count[4]++;
                  break;
                default:
                  break;
            }

            let location = `${element.country}-${element.province}`;
            mapData[location] = mapData[location] || {};
            mapData[location]['sum'] = (mapData[location]['sum'] || 0) + parseInt(element.reviews_rating);
            mapData[location]['count'] = (mapData[location]['count'] || 0) + 1;

            if (mapData[location]['count'] > maxCount) {
                _MostRatedState = location;
                maxCount = mapData[location]['count'];
            }
        });

        let areas = [];
        let min = 0;
        let max = 0;
        for (const key in mapData) {
            const value = (mapData[key].sum / mapData[key].count || 0).toFixed(2);
            areas.push({
                id: key,
                value: value,
                title: value
            })
            if (value <= min) {
                min = value;
                _LowestRatedState = key;
            } else if (value > max) {
                max = value;
                _HighestRatedState = key;
            }
        }

        _USMapData = {
            areas: areas,
            min: min,
            max: max
        }

        let event = new Event('USMapData');
        window.dispatchEvent(event);


        let mostRatedState = document.getElementById('most-rated-state');
        if (mostRatedState) {
            let state = statName.find(element => element.abbreviation === _MostRatedState).name;
            let textnode = document.createTextNode(state || _MostRatedState);
            mostRatedState.appendChild(textnode);
            document.getElementById('most-rated-state-loading').remove();
        }
        let highestRatedState = document.getElementById('highest-rated-state');
        if (highestRatedState) {
            let state = statName.find(element => element.abbreviation === _HighestRatedState).name;
            let textnode = document.createTextNode(state || _HighestRatedState);
            highestRatedState.appendChild(textnode);
            document.getElementById('highest-rated-state-loading').remove();
        }
        let lowestRatedState = document.getElementById('lowest-rated-state');
        if (lowestRatedState) {
            let state = statName.find(element => element.abbreviation === _LowestRatedState).name;
            let textnode = document.createTextNode(state || _LowestRatedState);
            lowestRatedState.appendChild(textnode);
            document.getElementById('lowest-rated-state-loading').remove();
        }
    }

    function getReviewRatingData() {
        if (!rawData) {
            window.addEventListener('dataIsReady', () => getReviewRatingData());
            return;
        }
        if (_USRatingData) {
            return _USRatingData;
        }
        let data = {};
        rawData.data.forEach(element => {
            let rating = Math.round(element.reviews_rating);
            if (isNaN(rating)) return;

            data[rating] = (data[rating] || 0) + 1;
        });

        _USRatingData = [];
        for (const key in data) {
            _USRatingData.push({
                rating: key,
                count: data[key]
            });
        }

        return _USRatingData;
    }

    function getReviewsCountPerDate() {
        if (!rawData) {
            window.addEventListener('dataIsReady', () => getReviewsCountPerDate());
            return;
        }
        if (_ReviewCountPerDate) {
            return _ReviewCountPerDate;
        }

        let data = {};
        rawData.data.forEach(element => {
            let rating = Math.round(element.reviews_rating);
            if (isNaN(rating)) return;

            let date = element.reviews_date.slice(0, 10);
            if (!data[date]) data[date] = {};

            data[date]['count'] = (data[date]['count'] || 0) + rating;
            data[date][rating] = (data[date][rating] || 0) + 1;
        });

        _ReviewCountPerDate = [];
        for (const key in data) {
            _ReviewCountPerDate.push({
                date: key,
                count: data[key]['count'],
                0: data[key][0],
                1: data[key][1],
                2: data[key][2],
                3: data[key][3],
                4: data[key][4],
                5: data[key][5],
                6: data[key][6],
                7: data[key][7],
                8: data[key][8],
                9: data[key][9],
                10: data[key][10],
            });
        }

        _ReviewCountPerDate.sort((a, b) => {
            var key1 = new Date(a.date);
            var key2 = new Date(b.date);

            if (key1 < key2) {
                return -1;
            } else if (key1 == key2) {
                return 0;
            } else {
                return 1;
            }
        });

        return _ReviewCountPerDate;
    }

    /**
     *
     */
    function drawUSMap(htmlElementId) {
        let USMapData = getUSMapData();

        if(!USMapData) {
            window.addEventListener('USMapData', () => drawUSMap(htmlElementId));
            return;
        }

        AmCharts.makeChart(htmlElementId, {
            type: "map",
            theme: "light",
=======
            type: "map",
            theme: "light",
            // colorSteps: 20,
            allowClickOnSelectedObject: false,
>>>>>>> 8e2d165713d40daf26f13a2f12cf7a050c559e2e
            dataProvider: {
                map: "usaLow",
                areas: USMapData.areas
            },

            areasSettings: {
                autoZoom: true
            },

            valueLegend: {
                right: 10,
                minValue: USMapData.min,
                maxValue: USMapData.max
            }
        });

        document.getElementById(`${htmlElementId}-loading`).remove();
        document.getElementById(htmlElementId).style.height = "500px";
    }

    function drawUSBarChart(htmlElementId) {
        let USMapData = getUSMapData();

        if (!USMapData) {
            window.addEventListener('USMapData', () => drawUSBarChart(htmlElementId));
            return;
        }

        let data = USMapData.areas;
        data.sort((a, b) => { return a.value - b.value })

        drawBarChart(data, 'id', 'value', false, htmlElementId, "500px");

        window.removeEventListener('USMapData', drawUSBarChart);
    }

    function drawAllReviewRatingChart(htmlElementId) {
        let USRatingData = getReviewRatingData();

        if (!USRatingData) {
            window.addEventListener('dataIsReady', () => drawAllReviewRatingChart(htmlElementId));
            return;
        }
        drawBarChart(USRatingData, 'rating', 'count', true, htmlElementId, '300px');
        window.removeEventListener('dataIsReady', drawAllReviewRatingChart);
    }

    function drawUSReviewCountPerDate(htmlElementId) {
        let ReviewCountPerDate = getReviewsCountPerDate();

        if (!ReviewCountPerDate) {
            window.addEventListener('dataIsReady', () => drawUSReviewCountPerDate(htmlElementId));
            return;
        }

        drawLineChart(ReviewCountPerDate, 'date', 'count', htmlElementId, '300px');
        window.removeEventListener('dataIsReady', drawUSReviewCountPerDate);
    }

    function drawRatingLinesChart(htmlElementId) {
        let ReviewCountPerDate = getReviewsCountPerDate();

        if (!ReviewCountPerDate) {
            window.addEventListener('dataIsReady', () => drawRatingLinesChart(htmlElementId));
            return;
        }
        drawLinesChart(ReviewCountPerDate, htmlElementId);
        window.removeEventListener('dataIsReady', drawRatingLinesChart);
    }

    /**
     * draw bar chart
     * @param {Object} data object should have x and y value to be draw
     * @param {String} x the field in data object that should be use as x value
     * @param {String} y the field in data object that should be use as y value
     * @param {Boolean} horizontal if true --> horizontal bar chart
     * @param {String} htmlElementId
     * @param {String} height
     */
    function drawBarChart(data, x, y, horizontal = false, htmlElementId, height = "500px") {
        AmCharts.makeChart(htmlElementId, {
            type: "serial",
            theme: "light",
            rotate: horizontal,
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
                valueField: y,
            }],
            chartCursor: {
                fullWidth: true,
                categoryBalloonEnabled: false,
                cursorAlpha: 0.1,
                zoomable: false
            },
            categoryField: x,
            categoryAxis: {
                gridPosition: "middle",
                gridAlpha: 0,
                tickPosition: "middle",
                labelRotation: 90
            }
        });
        document.getElementById(`${htmlElementId}-loading`).remove();
        document.getElementById(htmlElementId).style.height = height;
    }

    /**
     * draw bar chart
     * @param {Object} data object should have x and y value to be draw
     * @param {String} x the field in data object that should be use as x value
     * @param {String} y the field in data object that should be use as y value
     * @param {Boolean} horizontal if true --> horizontal bar chart
     * @param {String} htmlElementId
     * @param {String} height
     */
    function drawLineChart(data, x, y, htmlElementId, height = "500px") {
        AmCharts.makeChart(htmlElementId, {
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
                valueField: y,
            }],
            chartCursor: {
                fullWidth: true,
                categoryBalloonEnabled: false,
                cursorAlpha: 0.1,
                zoomable: false
            },
            categoryField: x,
            categoryAxis: {
                gridPosition: "middle",
                gridAlpha: 0,
                tickPosition: "middle",
                labelRotation: 45
            },
        });
        document.getElementById(`${htmlElementId}-loading`).remove();
        document.getElementById(htmlElementId).style.height = height;
    }

    /**
     *
     * @param {*} data
     * @param {*} htmlElementId
     * @param {*} height
     */
    function drawLinesChart(data, htmlElementId, height = "500px") {
        data = data.slice(-30);
        AmCharts.makeChart(htmlElementId, {
            type: "serial",
            theme: "light",
            dataProvider: data,
            valueAxes: [{
                stackType: "regular",
                gridAlpha: 0.2,
                dashLength: 0
            }],
            gridAboveGraphs: true,
            startDuration: 1,
            graphs: [
                { valueField: 0, title: `0`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 1, title: `1`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 2, title: `2`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 3, title: `3`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 4, title: `4`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 5, title: `5`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 6, title: `6`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 7, title: `7`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 8, title: `8`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 9, title: `9`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
                { valueField: 10, title: `10`, fillAlphas: 0.8, lineAlpha: 0.3, type: "column" },
            ],
            chartCursor: {
                fullWidth: true,
                categoryBalloonEnabled: false,
                cursorAlpha: 0.1,
                zoomable: false
            },
            categoryField: "date",
            categoryAxis: {
                gridPosition: "middle",
                gridAlpha: 0,
                tickPosition: "middle",
                labelRotation: 45
            },
            legend: {
                horizontalGap: 10,
                maxColumns: 1,
                position: "right",
                useGraphSettings: true,
                markerSize: 10,
                marginTop: 20
            },
            listeners: [{
                event: "drawn",
                method: addLegendLabel
            }]
        });
        document.getElementById(`${htmlElementId}-loading`).remove();
        document.getElementById(htmlElementId).style.height = height;
    }

    function addLegendLabel(e) {
        var title = document.createElement("div");
        title.innerHTML = "Legend";
        title.className = "legend-title";
        e.chart.legendDiv.appendChild(title)
    }



    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init,
        rawData: rawData,
        drawUSMap: drawUSMap,
        drawUSBarChart: drawUSBarChart,
        drawAllReviewRakingChart: drawAllReviewRatingChart,
        drawAllReviewTrend: drawUSReviewCountPerDate,
        drawRatingLinesChart: drawRatingLinesChart,
    }
})();
