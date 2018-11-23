var chart;
window.addEventListener("load", function(){
  var ctx = document.getElementById('myChart').getContext('2d');
  chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',
    // The data for our dataset
    data: {
      labels: [],
      datasets: [{
        backgroundColor: ['#B22634', '#E1CE30'],
        borderColor: 'rgba(255, 255, 255,0.3)',
        data: [],
      }]
    },
    // Configuration options go here
    options: {}
  });
})

function populateData(queriedData){
  var jsonObject = JSON.parse(queriedData);

  if (jsonObject) {
    for (providerName in jsonObject) {
      var h = document.createElement("H1");
      var hText = document.createTextNode(providerName);
      h.appendChild(hText);
      document.getElementsByTagName("BODY")[0].appendChild(h);

      var p = document.createElement("p");
      var pText = document.createTextNode("2014: " + jsonObject[providerName][2014] + " | 2015: " + jsonObject[providerName][2015]);
      p.appendChild(pText);
      document.getElementsByTagName("BODY")[0].appendChild(p);

      console.log(chart);

      chart.data.labels.push(providerName + " | 2014");
      chart.data.datasets[0].data.push(jsonObject[providerName][2014]);
      chart.update()
    }

  }
}
