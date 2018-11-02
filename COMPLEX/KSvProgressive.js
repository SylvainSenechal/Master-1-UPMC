// NB : voir si poids de 0 et utilite de 0 possibles (oui pour pas diviser par zero)
var listObjects = []
var listObjectsREFERENCEsize = 500000
var listObjectsSize = null
var Rparameter = 100

var backpack = []
var backpackCapacity = null

var startingTime, endTime
var myChart, chartContext
var dataChart = [], dataLabels = []
var nbIteration = 0

const init = () =>{
  createChart()
  loop()
}

const loop = () =>{
  startingTime = performance.now()
  createBackpack(nbIteration)
  calculateBackpackCapacity()
  fillBackPack()
  endTime = performance.now()
  updateChart()

  nbIteration++
  if(nbIteration>8) return
  requestAnimationFrame(loop)
}

const createBackpack = (nbIteration) =>{
  listObjectsSize = ((nbIteration+1) * listObjectsREFERENCEsize) / 10
  for(let i=0; i<listObjectsSize; i++){
    listObjects[i] = {poids: Math.floor(Math.random()*Rparameter)+1, utilite: Math.floor(Math.random()*Rparameter)+1}
    listObjects[i].benefice = listObjects[i].utilite / listObjects[i].poids
  }
  listObjects.sort( (object1, object2) => object2.benefice - object1.benefice )
}

const calculateBackpackCapacity = () =>{

  let capacity = 0
  listObjects.forEach( object => capacity += object.poids)
  backpackCapacity = Math.floor(capacity/2)
}

const fillBackPack = () =>{
  backpack = [] // Vider le backpack pour nouvelle iterations
  let cpt = 0
  let weightLeft = backpackCapacity
  while(weightLeft > 0 && cpt < listObjectsSize){
    if(weightLeft >= listObjects[cpt].poids){
      backpack.push(listObjects[cpt])
      weightLeft -= listObjects[cpt].poids
    }
    cpt++
  }
}

const updateChart = () =>{
  calculationTime = endTime - startingTime
  console.log("calculationTime : " + calculationTime) // NB : c est le tri qui est tres long

  dataChart.push(calculationTime)
  dataLabels.push(nbIteration)
  myChart.data.labels = dataLabels
  myChart.data.datasets[0].data = dataChart
  myChart.update()
}

const createChart = () =>{
  chartContext = document.getElementById("myChart").getContext('2d');
  myChart = new Chart(chartContext, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Script time',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

window.addEventListener('load', init); // La fonction est lancee des que la page est prete
