var ctx1 = document.getElementById("myChart1");
var ctx2 = document.getElementById("myChart2");
var ctx3 = document.getElementById("myChart3");
var ctx4 = document.getElementById("myChart4");
var currentURL = 'http://' + window.location.hostname + ':' + window.location.port;

window.addEventListener('dataIsReady', (event) => {
  var d = event.data.data[0].data;
  var city = [];
  var count = [];
  for (var i=0; i < 10; i++) {
    city.push(d[i]['city'].split(',')[0]);
    count.push(d[i]['count']);
  }

  var options1 =
  {
    type: 'bar',
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
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return label = tooltipItem.yLabel;
          }
        }
      },
      title: {
        display: true,
        text: "Top 10 Reviewed Cities"
      },
      legend: {
        display: false
      },
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
  };

  var myChart1 = new Chart(ctx1, options1);

});

window.addEventListener('dataIsReady_2', (event) => {
  var d = event.data.data[0].data;
  var category = [];
  var count = [];
  for (var i=0; i < 10; i++) {
    category.push(d[i]['category']);
    count.push(d[i]['count']);
  }
  var options2 = {
    type: 'doughnut',
    data: {
        labels: category,
        datasets: [{
            label: "Top 10 cities",
            data: count,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
        display: true,
        text: "Top Review Categories in Top 10 Cities"
      },
      legend: {
        display: false
      }
    }
  };
  var myChart2 = new Chart(ctx2, options2);
});

window.addEventListener('dataIsReady_3', (event) => {
  var d = event.data.data[0].data;
  var bussiness = [];
  var location = [];
  for (var i=0; i < 10; i++) {
    bussiness.push(d[i]['bussiness']);
    var l = d[i]['location'].split(',');
    let x = parseFloat(l[0]);
    let y = parseFloat(l[1]);
    let r = d[i]['count']/20;
    let temp = {'x': x, 'y': y, 'r': r};
    location.push(temp);
  }

  var options3 = {
      type: 'bubble',
      data: {
          datasets1: [{
            data: bussiness
          }],
          datasets: [{
              data: location,
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
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              // console.log(data.datasets1[0].data[0]);
              return label = data.datasets1[0].data[tooltipItem.datasetIndex];
              // return label = data.datasets1.data[0][tooltipItem.datasetsIndex];
            }
          }
        },
        title: {
          display: true,
          text: "Top 10 Reviewed Bussinesses and Their Locations"
        },
        legend: {
          display: false
        },
        responsive: 'true'
      }
  };
  var myChart3 = new Chart(ctx3, options3);
});

var find = function() {
    var data = {"collection": "chart_data", "data":{"id":2}};
    api.jQueryPost(currentURL + '/mongodb/find', data, 'dataIsReady');
}();

var find_2 = function() {
    var data = {"collection": "chart_data", "data":{"id":3}};
    api.jQueryPost(currentURL + '/mongodb/find', data, 'dataIsReady_2');
}();

var find_3 = function() {
    var data = {"collection": "chart_data", "data":{"id":4}};
    api.jQueryPost(currentURL + '/mongodb/find', data, 'dataIsReady_3');
}();
