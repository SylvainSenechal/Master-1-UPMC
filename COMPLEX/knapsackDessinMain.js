// NB : voir si poids de 0 et utilite de 0 possibles (oui pour pas diviser par zero)
var listObjects = []
var listObjectsREFERENCEsize = 1000000
var listObjectsSize = null
var Rparameter = 100

var backpack = []
var backpackCapacity = null

var nbIteration = 0
var startingTime, endTime
var xData = [], yData = []

var ctx, canvas

const init = () =>{
  canvas = document.getElementById('mon_canvas')
  ctx = canvas.getContext('2d')
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
  loop()
}

const loop = () =>{
  startingTime = performance.now()
  createBackpack(nbIteration)
  calculateBackpackCapacity()
  fillBackPack()
  endTime = performance.now()
  calculateTimes()

  dessin()

  nbIteration++
  if(nbIteration>5) return
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

const calculateTimes = () =>{
  calculationTime = endTime - startingTime
  console.log("calculationTime : " + calculationTime) // NB : c est le tri qui est tres long

  xData.push(nbIteration)
  yData.push(calculationTime)
}


const dessin = () =>{
	ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(0, 0, 10, 10)
  console.log(yData)

  ctx.strokeStyle = "rgba(0, 0, 0, 1)"
  ctx.beginPath();
  ctx.moveTo(30,30);
  ctx.lineTo(30,500);
  ctx.lineTo(700,500);
  ctx.stroke();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"
  ctx.moveTo(30,200);
  ctx.lineTo(700,200);
  ctx.stroke();
  // for(let i=0; i<Partie.nbCase; i++){
  //   for(let j=0; j<Partie.nbCase; j++){
  //     if(Partie.grid[i][j] === 0){
  //       ctx.fillStyle = "#000000"
  //     }
  //     else{
  //       ctx.fillStyle = 'rgb(' +Partie.grid[i][j]*255+ ',' +Partie.grid[i][j]*255+ ',' +Partie.grid[i][j]*255+ ')'
  //     }
  //     ctx.fillRect(i*Partie.widthCase+Partie.offset, j*Partie.widthCase+Partie.offset, Partie.widthCase, Partie.widthCase);
  //   }
  // }
}

window.addEventListener('load', init); // La fonction est lancee des que la page est prete
