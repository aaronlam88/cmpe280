"use strict"; // to avoid bad JavaScript code https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode


let graph = (function () {
    // ==== class variables ====
    let currentURL = 'http://' + window.location.hostname + ':' + window.location.port;
    let rawData = undefined;

    let _USMapData = undefined;

    function init() {
        api.jQueryPost(currentURL + '/mongodb/find', { collection: 'hotel_review', data: {} }, 'dataIsReady');
        window.addEventListener('dataIsReady', (event) => dataIsReady(event));
    }

    function dataIsReady(data) {
        if (data.status === 'ERROR') {
            console.log(data.message);
        }
        rawData = data.data;
    }

    function getUSMapData() {
        if (!rawData) {
            window.addEventListener('dataIsReady', () => getUSMapData());
            return;
        }
        if (_USMapData) {
            return _USMapData;
        }
        // TODO: handle error
        if (rawData.status !== 'OK') {
            return;
        }

        let mapData = {};
        mapData['US-VT'] = {};
        mapData['US-VT']['sum'] = 0;
        mapData['US-VT']['count'] = 0;
        rawData.data.forEach(element => {
            if (!element.country || !element.province || element.province.length != 2 || !element.reviews_rating) return;

            let location = `${element.country}-${element.province}`;
            mapData[location] = mapData[location] || {};
            mapData[location]['sum'] = (mapData[location]['sum'] || 0) + parseInt(element.reviews_rating);
            mapData[location]['count'] = (mapData[location]['count'] || 0) + 1;
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
            if (value < min) {
                min = value;
            } else if (value > max) {
                max = value;
            }
        }

        _USMapData = {
            areas: areas,
            min: min,
            max: max
        }

        let event = new Event('USMapData');
        window.dispatchEvent(event);
    }

    /**
     *
     * @param {String} htmlElementId
     */
    function drawUSMap(htmlElementId) {
        let USMapData = getUSMapData();

        if (!USMapData) {
            window.addEventListener('USMapData', () => drawUSMap(htmlElementId));
            return;
        }

        AmCharts.makeChart(htmlElementId, {
            titles: [
                { text: "Avg Review Rating" }
            ],
            type: "map",
            theme: "light",
            colorSteps: 10,
            allowClickOnSelectedObject: false,
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

        window.removeEventListener('USMapData', drawUSMap);
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
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                zoomable: false
            },
            categoryField: x,
            categoryAxis: {
                gridPosition: "start",
                gridAlpha: 0,
                tickPosition: "start"
            }
        });
        document.getElementById(`${htmlElementId}-loading`).remove();
        document.getElementById(htmlElementId).style.height = height;
    }

    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init,
        drawUSMap: drawUSMap,
        drawUSBarChart: drawUSBarChart,
    }
})();

graph.init();
