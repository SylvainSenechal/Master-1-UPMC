// NB : voir si poids de 0 et utilite de 0 possibles (oui pour pas diviser par zero)
listObjects = []
listObjectsREFERENCEsize = 1000000
listObjectsSize = null
Rparameter = 100

backpack = []
backpackCapacity = null

const calculateBackpackCapacity = () =>{

  let capacity = 0
  listObjects.forEach( object => capacity += object.poids)
  backpackCapacity = Math.floor(capacity/2)
}

var startingTime, endTime
var context
var myChart
var dataChart = [], dataLabels = []

const init = () =>{
  createChart()

  for(let nbIteration=0; nbIteration<30; nbIteration++){ // Double boucle, 1 pour R, 1 pour Tmax
    startingTime = performance.now()
    createBackpack(nbIteration)
    calculateBackpackCapacity()
    fillBackPack()
    endTime = performance.now()
    calculationTime = endTime - startingTime
    console.log("calculationTime : " + calculationTime) // NB : c est le tri qui est tres long

    dataChart.push(calculationTime)
    dataLabels.push(nbIteration)
    myChart.data.labels = dataLabels
    myChart.data.datasets[0].data = dataChart
    myChart.update()
  }
}

const createBackpack = (nbIteration) =>{
  listObjectsSize = ((nbIteration+1) * listObjectsREFERENCEsize) / 10
  for(let i=0; i<listObjectsSize; i++){
    listObjects[i] = {poids: Math.floor(Math.random()*Rparameter)+1, utilite: Math.floor(Math.random()*Rparameter)+1}
    listObjects[i].benefice = listObjects[i].utilite / listObjects[i].poids
  }
  listObjects.sort( (object1, object2) => object2.benefice - object1.benefice )
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

  // console.log(backpack)
  // console.log("Weight left : " + weightLeft)
}


function createChart(){
  context = document.getElementById("myChart").getContext('2d');
  myChart = new Chart(context, {
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
