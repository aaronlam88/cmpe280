var ctx = document.getElementById("myChart");
var currentURL = 'http://' + window.location.hostname + ':' + window.location.port;

window.addEventListener('dataIsReady', (event) => {
  var d = event.data.data[0].data;
  // var temp = (d) => {
  //
  // }


  var options =
  {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Scatter',
            data: d,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom'
          }]
        },
        responsive: 'false'
    }
  }
  var myChart = new Chart(ctx, options);
});

var find = function() {
    var data = {"collection": "chart_data", "data":{}};
    api.jQueryPost(currentURL + '/mongodb/find', data, 'dataIsReady');
}();
