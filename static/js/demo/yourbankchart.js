var ctx = document.getElementById("myChart").getContext('2d');

// Define the data for the first bar chart
var data1 = {
  labels: ["First Lanugage", "Second Language", "English", "Maths", "Science", "Social"],
  datasets: [{
    label: "Topics Completed",
    borderWidth: 1,
    backgroundColor: "#4e73df",
    hoverBackgroundColor: "#2e59d9",
    borderColor: "#4e73df",
    data: [44, 59, 17, 71, 56, 55, 40],
  }]
};

// Define the data for the second bar chart
var data2 = {
  labels: ["Health", "Living", "Sports", "GK", "Others"],
  datasets: [{
    label: "Topics Completed ",
    
    borderWidth: 1,
    backgroundColor: "#4e73df",
    hoverBackgroundColor: "#2e59d9",
    borderColor: "#4e73df",
    data: [53, 22, 13, 71, 55],
  }]
};

var options1 = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'subjects'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel +" : " + number_format(tooltipItem.yLabel);
        }
      }
    },
}

// Create the first bar chart
var chart1 = new Chart(ctx, {
    type: 'bar',
    data: data1,
    options: options1,
});

// Create the second bar chart
var chart2 = new Chart(ctx, {
    type: 'bar',
    data: data2,
    options: options1,
});

// Function to show the first bar chart
function showBarChart1() {
  chart1.destroy(); // Destroy the existing chart
  chart2.destroy(); // Destroy the existing chart
  chart1 = new Chart(ctx, {
        type: 'bar',
        data: data1,
        options: options1,
    });
  document.getElementById("btn1").classList.add("btn-primary");
  document.getElementById("btn2").classList.remove("btn-primary");
}

// Function to show the second bar chart
function showBarChart2() {
  chart1.destroy(); // Destroy the existing chart
  chart2.destroy(); // Destroy the existing chart
  chart2 = new Chart(ctx, {
    type: 'bar',
    data: data2,
    options: options1,
  });
  document.getElementById("btn1").classList.remove("btn-primary");
  document.getElementById("btn2").classList.add("btn-primary");
}

// Show the first bar chart initially
showBarChart1();
document.getElementById("btn1").classList.add("btn-primary");
