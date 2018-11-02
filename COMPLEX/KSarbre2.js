// NB : voir si poids de 0 et utilite de 0 possibles (oui pour pas diviser par zero)
var listObjects = []
var listObjectsSize = null
var Rparameter = 100

var backpack = []
var backpackCapacity = null

var startingTime, endTime

const init = () =>{
  startingTime = performance.now()
  createBackpack(listObjectsREFERENCEsize)
  calculateBackpackCapacity()
  constructPile()
  endTime = performance.now()

  calculationTime = endTime - startingTime
  console.log("calculationTime : " + calculationTime) // NB : c est le tri qui est tres long

}


Node = function(object, pris, listePris, nextObject, binf, bsup, weightLeft){
  this.poids = object.poids
  this.utilite = object.utilite
  this.pris = pris // 0 : pas pris, 1 : pris
  this.listePris = listePris

  this.nextObject = nextObject
  this.binf = binf
  this.bsup = bsup
  this.weightLeft = weightLeft
}

var listObjectsREFERENCEsize = 300
var pile = []

var solution = 0
var solutionUtilite = 0
var solutionPoids = 0
const bestSolution = listePris =>{
  let utilite = 0
  let poids = 0
  listePris.forEach(elem =>{
    utilite += elem.utilite,
    poids += elem.poids
  })
  if(utilite > solutionUtilite){
    solution = listePris
    solutionUtilite = utilite
    solutionPoids = poids
  }
}

var bminMax = 0
const constructPile = () =>{
  console.log(listObjects)
  let nbNode = 2
  let nbFeuille = 0
  let pile = []
  let bornInfPasPris = fillGlouton(listObjects.slice(0), backpackCapacity)
  let bornSupPasPris = fillGloutonFrac(listObjects.slice(0), backpackCapacity)
  let binfPris = fillGlouton(listObjects.slice(1), backpackCapacity - listObjects[0].poids) + listObjects[0].utilite
  let bsupPris = fillGloutonFrac(listObjects.slice(1), backpackCapacity - listObjects[0].poids) + listObjects[0].utilite

  pile.unshift(new Node(listObjects[0], 0, [], 1, bornInfPasPris, bornSupPasPris, backpackCapacity))
  pile.unshift(new Node(listObjects[0], 1, [listObjects[0]], 1, binfPris, bsupPris, backpackCapacity - listObjects[0].poids))

  bminMax = Math.max(binfPris, bornInfPasPris)
  while(pile.length>0){
    let current = pile[0].nextObject
    let a, b

    bestSolution(pile[0].listePris)
    if(current < listObjectsREFERENCEsize){
      let weightLeft = pile[0].weightLeft
      let listePrisUtilite = 0
      let tmp = pile[0].listePris
      let lp = []
      tmp.forEach(elem => lp.push(elem))

      lp.forEach(elem => listePrisUtilite += elem.utilite)
      let bornInfPasPris = fillGlouton(listObjects.slice(current), weightLeft) + listePrisUtilite
      let bornSupPasPris = fillGloutonFrac(listObjects.slice(current), weightLeft) + listePrisUtilite


      // Voir si la solution est réalisable
      lp.unshift(listObjects[current])
      let poidsTT = 0
      lp.forEach(elem => poidsTT += elem.poids)
      while(poidsTT > backpackCapacity && current < listObjectsREFERENCEsize-1){
        current++
        lp.shift()
        lp.unshift(listObjects[current])
        poidsTT = 0
        lp.forEach(elem => poidsTT += elem.poids)
      }
      current = pile[0].nextObject
      poidsTT = 0
      lp.forEach(elem => poidsTT += elem.poids)
      if(poidsTT > backpackCapacity){
        lp.shift()
      }
      listePrisUtilite = 0
      lp.forEach(elem => listePrisUtilite += elem.utilite)
      let binfPris = fillGlouton(listObjects.slice(current+1), weightLeft - listObjects[current].poids) + listePrisUtilite
      let bsupPris = fillGloutonFrac(listObjects.slice(current+1), weightLeft - listObjects[current].poids) + listePrisUtilite
      a = new Node(listObjects[current], 0, pile[0].listePris, current + 1, bornInfPasPris, bornSupPasPris, weightLeft)
      b = new Node(listObjects[current], 1, lp, current + 1, binfPris, bsupPris, weightLeft - listObjects[current].poids)
    }
    let binf = pile[0].binf
    let bsup = pile[0].bsup
    bminMax = Math.max(bminMax, binf)

    pile.shift()
    if(current < listObjectsREFERENCEsize){
      if(bminMax < bsup){
        pile.unshift(a)
        pile.unshift(b)
        nbNode += 2
      }
    }
  }
  console.log("nb Node : " + nbNode)
  console.log("nb feuille : " + nbFeuille)
  console.log("backpackCapacity : " + backpackCapacity)
  console.log("solutionUtilite : " + solutionUtilite)
  console.log("solutionPoids : " + solutionPoids)
  console.log("solution : ")
  console.log(solution)
}

const fillGlouton = (listObjects, weightLeft) =>{
  let cpt = 0
  // let weightLeft = backpackCapacity
  let utilite = 0

  listObjects.sort( (object1, object2) => object2.benefice - object1.benefice )
  while(weightLeft > 0 && cpt < listObjects.length){
    if(weightLeft >= listObjects[cpt].poids){
      utilite += listObjects[cpt].utilite
      weightLeft -= listObjects[cpt].poids
    }
    cpt++
  }
  return utilite
}

const fillGloutonFrac = (listObjects, weightLeft) =>{
  let cpt = 0
  // let weightLeft = backpackCapacity
  let utilite = 0

  listObjects.sort( (object1, object2) => object2.benefice - object1.benefice )
  while(weightLeft > 0 && cpt < listObjects.length){
    if(weightLeft >= listObjects[cpt].poids){
      utilite += listObjects[cpt].utilite
      weightLeft -= listObjects[cpt].poids
    }
    else{
      let prorata = (weightLeft/listObjects[cpt].poids)*listObjects[cpt].utilite
      utilite += Math.floor(prorata)
      weightLeft = -1
    }
    cpt++
  }
  return utilite
}

const createBackpack = (size) =>{
  listObjectsSize = size
  // listObjects[0] = {poids:14 , utilite:24 }
  // listObjects[0].benefice = listObjects[0].utilite / listObjects[0].poids
  // listObjects[1] = {poids:10 , utilite:19 }
  // listObjects[1].benefice = listObjects[1].utilite / listObjects[1].poids
  // listObjects[2] = {poids:8 , utilite:16 }
  // listObjects[2].benefice = listObjects[2].utilite / listObjects[2].poids
  // listObjects[3] = {poids:6 , utilite:13 }
  // listObjects[3].benefice = listObjects[3].utilite / listObjects[3].poids
  // listObjects[4] = {poids:5 , utilite:5 }
  // listObjects[4].benefice = listObjects[4].utilite / listObjects[4].poids
  // listObjects[5] = {poids:2 , utilite:3 }
  // listObjects[5].benefice = listObjects[5].utilite / listObjects[5].poids


  for(let i=0; i<listObjectsSize; i++){
    listObjects[i] = {poids: Math.floor(Math.random()*Rparameter)+1, utilite: Math.floor(Math.random()*Rparameter)+1}
    listObjects[i].benefice = listObjects[i].utilite / listObjects[i].poids
  }

  //listObjects.sort( (object1, object2) => object2.benefice - object1.benefice )
}

const calculateBackpackCapacity = () =>{
  let capacity = 0
  listObjects.forEach( object => capacity += object.poids)
  backpackCapacity = Math.floor(capacity/2)
}

window.addEventListener('load', init); // La fonction est lancee des que la page est prete
