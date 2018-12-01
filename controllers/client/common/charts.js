var charts = (function() {
    function drawCharts(htmlElementId) {
        if(!rawData) {
            window.addEventListener('dataIsReady', () => drawCharts(htmlElementId));
            return;
        }

        var options1 = {
        type: 'bar',
        data: {
            labels: states,
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
            responsive: 'true'
        }
      };
        var myChart1 = new Chart(document.getElementById(htmlElementId), options1);

        document.getElementById(`${htmlElementId}-loading`).remove();
        document.getElementById(htmlElementId).style.height = "300px";
    }

    return {
        drawCharts: drawCharts
    }
})();
