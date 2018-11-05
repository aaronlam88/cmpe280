var ctx1 = document.getElementById("myChart1");
var ctx2 = document.getElementById("myChart2");
var ctx3 = document.getElementById("myChart3");
var ctx4 = document.getElementById("myChart4");
var currentURL = 'http://' + window.location.hostname + ':' + window.location.port;

window.addEventListener('dataIsReady', (event) => {
  var d = event.data.data[0].data;
  var city = [];
  var count = [];
  for (var i=0; i < d.length-1; i++) {
    city.push(d[i]['city']);
    count.push(d[i]['count']);
  }
  var options =
  {
    type: 'horizontalBar',
    data: {
        labels: city,
        datasets: [{
            label: "Top 10 cities",
            data: count,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(151, 239, 144, 0.2)',
                'rgba(116, 68, 88, 0.2)',
                'rgba(238, 181, 86, 0.2)',
                'rgba(70, 219, 17, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(151, 239, 144, 1)',
              'rgba(116, 68, 88, 1)',
              'rgba(238, 181, 86, 1)',
              'rgba(70, 219, 17, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        },
        // scales: {
        //   xAxes: [{
        //       type: 'linear',
        //       position: 'bottom'
        //   }]
        // },
        responsive: 'true'
    }
  }
  var myChart1 = new Chart(ctx1, options);
  var myChart2 = new Chart(ctx2, options);
  var myChart3 = new Chart(ctx3, options);
  var myChart4 = new Chart(ctx4, options);

});

var find = function() {
    var data = {"collection": "chart_data", "data":{"id":2}};

    api.jQueryPost(currentURL + '/mongodb/find', data, 'dataIsReady');
}();
