// NB : voir si poids de 0 et utilite de 0 possibles (oui pour pas diviser par zero)
var listObjects = []
var listObjectsSize = null
var Rparameter = 100

var backpack = []
var backpackCapacity = null

var startingTime, endTime
var myChart, chartContext
var dataChart = [], dataLabels = []
var nbIteration = 0

const init = () =>{
  startingTime = performance.now()
  createBackpack(listObjectsREFERENCEsize)
  calculateBackpackCapacity()
  constructPile()
  endTime = performance.now()

  calculationTime = endTime - startingTime
  console.log("calculationTime : " + calculationTime) // NB : c est le tri qui est tres long

}

var pile = []
var bestInf = null
var bestSolution = 0

Node = function(object, pris, listePris){
  this.poids = object.poids
  this.utilite = object.utilite
  this.pris = pris // 0 : pas pris, 1 : pris
  this.listePris = listePris
}

var listObjectsREFERENCEsize = 4
const constructPile = () =>{
  // 0 : pas pris, 1 : pris
  // unshift : ajout debut, shift : retrait debut
  let cpt = 0
  pile.unshift(new Node(listObjects[cpt], 0, []))
  pile.unshift(new Node(listObjects[cpt], 1, [listObjects[cpt]]))
  if(pile[0].poids < backpackCapacity) bestSolution = pile[0].utilite
  console.log(listObjects)
  pile.forEach( elem => console.log(elem))
  cpt++
  console.log("DEBUT WHILE")

  let a = new Node(listObjects[cpt], 0, pile[cpt-1].listePris)
  console.log(pile[cpt-1].listePris)
  let lp = pile[cpt-1].listePris
  lp.unshift(listObjects[cpt])
  console.log(lp)
  let b = new Node(listObjects[cpt], 1, lp)

  pile.shift()
  pile.unshift(a)
  pile.unshift(b)
  pile.forEach( elem => console.log(elem))

  // while(pile.length>0){
  //   // if(pile[0].poids < backpackCapacity) bestSolution.push(pile[0])
  //
  //   console.log("cpt : " + cpt)
  //   console.log(pile)
  //   console.log("size pile : " + pile.length)
  //   // let a = new Node(listObjects[cpt-1], 0, pile[cpt-1].listePris)
  //   // let b = new Node(listObjects[cpt-1], 1, [pile[cpt-1].listePris].unshift(listObjects[cpt]))
  //   // pris potentiellement inutile grace a liste pris
  //   pile.shift()
  //   if(cpt < listObjectsREFERENCEsize){
  //     pile.unshift(new Node(listObjects[cpt], 0, pile[cpt-1].listePris))
  //     pile.unshift(new Node(listObjects[cpt], 1, pile[cpt-1].listePris.unshift(listObjects[cpt])))
  //     cpt++
  //   }
  //   pile.forEach( elem => console.log(elem))
  // }
}

const createBackpack = (size) =>{
  listObjectsSize = size
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


window.addEventListener('load', init); // La fonction est lancee des que la page est prete
