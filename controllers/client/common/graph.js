"use strict"; // to avoid bad JavaScript code https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode


let graph = (function () {
    // ==== class variables ====
    let currentURL = 'http://' + window.location.hostname + ':' + window.location.port;
    let rawData = undefined;

    let _USMapData = undefined;

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
        rawData.data.forEach(element => {
            if (!element.province || !element.reviews_rating) return;

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
     */
    function drawUSMap(htmlElementId) {
        let USMapData = getUSMapData();

        if(!USMapData) {
            window.addEventListener('USMapData', () => drawUSMap(htmlElementId));
            return;
        }

        AmCharts.makeChart(htmlElementId, {
            titles: [
                { text: "Avg Review Rating by State" }
            ],
            type: "map",
            theme: "light",
            colorSteps: 10,
            panEventsEnabled: true,
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
    // expose functions or variables in the return
    // ==> make functions or variables in the return public
    return {
        init: init,
        drawUSMap: drawUSMap
    }
})();

graph.init();