var chart;
var chartTwo;
var jsonObject;
var queriedData;
var yearTitle;
var yearTitleArr = [];
var ctxArr = [];

// function createCanvas() {
//   for (var x = 0; x < 3; x++) {
//     ctx = document.createElement('canvas')
//     ctxArr.push(ctx)
//     console.log("the CTX ARRAY is: " + ctxArr)
//   }
// }


function createGraph(chartData) {
  jsonObject = JSON.parse(chartData);
  //create canvas
  var count = 0;
  console.log(jsonObject)
  for (var key in jsonObject) {
    console.log(key);
    for (var key in jsonObject[key]) {
      console.log(key) //Debug
      yearTitle = parseInt(key, 10)
      console.log(yearTitle)
      yearTitleArr.push(yearTitle) //add to array
        // console.log("YEAR TITLE: " + yearTitle) //debug
        ++count; //debug, helps me keep track of iterations
      yearTitleArr.push(yearTitle) //add to array after new count - next iteration
      var min = Math.min.apply(Math, yearTitleArr);
      var max = Math.max.apply(Math, yearTitleArr);

      // console.log(count) //debug. tells me how many iterations
      console.log(yearTitleArr) //debug - check whats in the Arr.
      console.log("MIN = " + min + "     " + "MAX = " + max) //debug - check whats in the Arr.
    }
    if (max - min == 0) {
      console.log("One Graph should be made")
      var ctx = document.getElementById("myChart").getContext('2d');
      chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',
        // The data for our dataset
        data: {
          labels: [],
          datasets: [{
            backgroundColor: ['#3c6382', '#0c2461', '#3498db', '#B22634', '#E1CE30', '#27ae60'],
            borderColor: 'rgba(255, 255, 255,0.3)',
            data: [],
          }]
        },
        // Configuration options go here
        options: {
          percentageInnerCutout: 80,
          maintainAspectRatio: true,
          animateScale: true,
          tooltips:{
            mode: 'index',
          },
          legend:{
            position: 'top',
            labels:{
              defaultFontFamily: "'Helvetica  '",
              align: 'start',
            }
          },
            layout: {
              padding: {
                  left: 50,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
          }
        }
      });
      chartTwo = null;
    } else if (max - min == 1) {
      var divider = document.createElement("div");
      divider.className = "vl";
      document.getElementsByClassName("divider-container")[0].appendChild(divider);
      console.log("Two Graph should be made")
      var ctx = document.getElementById("myChart").getContext('2d');
      chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',
        // The data for our dataset
        data: {
          labels: [],
          datasets: [{
            backgroundColor: ['#1abc9c', '#3aac31', '#16a085', '#3498db', '#E1CE30', '#27ae60'],
            borderColor: 'rgba(255, 255, 255,0.3)',
            data: [],
          }]
        },
        // Configuration options go here
        options: {
          percentageInnerCutout: 80,
          maintainAspectRatio: true,
          animateScale: true,
          tooltips:{
            bodyFontSize: 8,
          }
        }
      });
      var context = document.getElementById("secondChart").getContext('2d');
      console.log("THIS IS AFTER GETTING 2ND CHART ELEMENT")
      chartTwo = new Chart(context, {
        // The type of chart we want to create
        type: 'doughnut',
        // The data for our dataset
        data: {
          labels: [],
          datasets: [{
            backgroundColor: ['#1abc9c', '#3aac31', '#1abc9c', '#16a085', '#E1CE30', '#27ae60'],
            borderColor: 'rgba(255, 255, 255,0.3)',
            data: [],
          }]
        },
        // Configuration options go here
        options: {
          percentageInnerCutout: 80,
          maintainAspectRatio: true,
          animateScale: true,
          tooltips:{
            bodyFontSize: 8,
          }
        }
      });
    }
  }
}


function populateData() {
  // queriedData = data;

  if (jsonObject) {
    for (providerName in jsonObject) {
      var h = document.createElement("H1");
      h.className = "provider-name-title h1";
      var hText = document.createTextNode(providerName);
      h.appendChild(hText);
      document.getElementsByTagName("BODY")[0].appendChild(h);

      var p = document.createElement("p");
      p.className = "provider-info";
      var pText = document.createTextNode("2014 Completions: " + jsonObject[providerName][2014] + " | 2015 Completions: " + jsonObject[providerName][2015]);
      p.appendChild(pText);
      document.getElementsByTagName("BODY")[0].appendChild(p);

      if (jsonObject[providerName][2014]) {
        chart.data.labels.push(providerName + " | 2014");
        chart.data.datasets[0].data.push(jsonObject[providerName][2014]);
      } else if (jsonObject[providerName][2015]) {
        chart.data.labels.push(providerName + " | 2015");
        chart.data.datasets[0].data.push(jsonObject[providerName][2015]);
      }
      chart.update()
      if (chartTwo) {
        chartTwo.data.labels.push(providerName + " | 2015");
        chartTwo.data.datasets[0].data.push(jsonObject[providerName][2015]);
        chartTwo.update()
      }
    }

  }
}
