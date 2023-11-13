const canvasWidth = innerWidth/1.5
const canvasHeight = innerHeight/1.2

let ship;
let img;
const KEYS = {}


// =========== ESCUCHADOR EVENTOS KEYS  ===============
addEventListener('keydown', e => {
  KEYS[e.key] = true;
})
addEventListener('keyup', e =>{
  KEYS[e.key] = false;
})
// function preload() {
//   img = loadImage('https://upload.wikimedia.org/wikipedia/commons/9/9b/DVD_logo.svg');
// }






// ============ SET UP ==============
function setup() {
  createCanvas(canvasWidth,canvasHeight);
  background(200);

  

  // noCursor()
  frameRate(120)

  ship = {
    posicion: createVector(width / 2, height / 2),
    direccion: createVector(-1, 0),
    aceleracion: 0,
    scale: 0.5
  };
}











// ==================== SQUARE ====================
// posicion, velocidad y friccion
const squarePos = {
  x: canvasWidth/2,
  y: canvasHeight/2,
}
const squareVel = {
  x: 0,
  y: 0,
}
const squareSize = {
  x: 20,
  y: 20,
}
let squareFriction = 0.99;





// movimiento
function movementSquare() {
  // Configuración Movimiento
  if(KEYS['ArrowLeft'] || KEYS['a']) {
    squareVel.x -= 0.5;
  } else if (KEYS['ArrowRight'] || KEYS['d']) {
    squareVel.x += 0.5;
  }
  if(KEYS['ArrowUp'] || KEYS['w']) {
    squareVel.y -= 0.5
  } else if (KEYS['ArrowDown'] || KEYS['s']) {
    squareVel.y += 0.5
  }
  
  squarePos.x += squareVel.x
  squareVel.x *= squareFriction


  squarePos.y += squareVel.y
  squareVel.y *= squareFriction

  watchBorder()
}

// limites mapa
function watchBorder() {
  if(squarePos.x < 0) {
    squarePos.x = 0
    squareVel.x *= -1; // Invertir la dirección
  } else if ((squarePos.x + squareSize.x) > canvasWidth) {
    squareVel.x *= -1; // Invertir la dirección
  }
  if(squarePos.y < 0) {
    squarePos.y = 0;
    squareVel.y *= -1; // Invertir la dirección
  } else if ((squarePos.y + squareSize.y) > canvasHeight) {
    squarePos.y = canvasHeight - squareSize.y;
    squareVel.y *= -1;
    // squareVel.y *= -1; // Invertir la dirección
  }
}














// ============ DRAW ==============
function draw() {
  // createCanvas(width,height);

  background('#0f0f0f');
  

  // dimensiones y caracteristicas
  fill(255,50,0, 90)
  strokeWeight(1)
  stroke(255,255,255)
  // image(img, squarePos.x,squarePos.y, 300 , 100);
  rect(squarePos.x,squarePos.y,squareSize.x,squareSize.y)

  movementSquare() 

  
  // background("white");

  // posicion de la imagen del coche
  translate(carro.posicion.x, carro.posicion.y);
  rotate(carro.direccion.heading());
  scale(carro.scale)
  // para fijar el centro de la imagen como el comienzo de la imagen
  translate(-carro.img.width / 2, -carro.img.height / 2);
  drawingContext.filter = "drop-shadow(10px 10px 5px black)"
  
  image(carro.img, 0, 0);



}
















