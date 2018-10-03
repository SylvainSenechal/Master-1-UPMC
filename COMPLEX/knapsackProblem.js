// NB : voir si poids de 0 et utilite de 0 possibles (oui pour pas diviser par zero)
listObjects = []
listObjectsSize = 50000

rangeWeight = 100
rangeUtility = 10

backpack = []
maxBackpackWeight = 100000


const initList = () =>{
  startingTime = performance.now()

  for(let i=0; i<listObjectsSize; i++){
    listObjects[i] = {poids: Math.floor(Math.random()*rangeWeight)+1, utilite: Math.floor(Math.random()*rangeUtility)+1}
    listObjects[i].benefice = listObjects[i].utilite / listObjects[i].poids
  }
  console.log(listObjects)
  listObjects.sort( (object1, object2) => object2.benefice - object1.benefice )
  console.log(listObjects)

  fillBackPack()
}

var startingTime, endTime
const fillBackPack = () =>{
  let cpt = 0
  let weightLeft = maxBackpackWeight

  while(weightLeft > 0 && cpt < listObjectsSize){
    if(weightLeft >= listObjects[cpt].poids){
      backpack.push(listObjects[cpt])
      weightLeft -= listObjects[cpt].poids
    }
    cpt++
  }
  endTime = performance.now()

  calculationTime = endTime - startingTime
  console.log(backpack)
  console.log("Weight left : " + weightLeft)
  console.log("calculationTime : " + calculationTime) // NB : c est le tri qui est tres long
}

console.log(listObjectsSize.length)










window.addEventListener('load', initList); // La fonction est lancee des que la page est prete
