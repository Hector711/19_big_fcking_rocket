let cvW = 1020
let cvH = 700

let KEYS = {};

let ship;
let nave;

let sun;
let planets = [];
let numPlanets = 5;

let G = 10;


// === ESCUCHADOR DE EVENTOS ===
addEventListener('keydown', e => {
  KEYS[e.key] = true;
})
addEventListener('keyup', e =>{
  KEYS[e.key] = false;
})

// === PRECARGA DE IMAGENES === 
function preload() {
  nave = loadImage('spaceship.png')
}



// -------------=== SETUP ===-------------
function setup() {
  createCanvas(cvW, cvH);
  ship = {
    // pos: createVector(cvW / 2, cvH / 2),
    pos: createVector(-400, 300),
    dir: createVector(1, 0),
    acel: 0,
    sizeX: 40,
    sizeY: 40,
    img: nave,
    scale:0.08
  };
  
  sun = new Body(100, createVector(0,0), createVector(0,0))

  // PLANET 
  for (let i = 0; i < planets.length; i++) {
    
    //  Position
    let r = random(sun.r, min(cvW/2, cvH/2));
    let theta = random(TWO_PI);
    let planetPos = createVector(r*cos(theta), r*sin(theta))
    
    // Velocity
    let planetVel = planetPos.copy()
    planetVel.rotate(HALF_PI)
    planetVel.setMag(sqrt(G*sun.mass/planetPos.mag()))
    
    planets.push( new Body(25, planetPos, planetVel))
  }
}







function draw() {
  translate(cvW/2, cvH/2)
  background("black");


  // SHIP 
  push();
  // rotate tiene que ir complementado con un trasnlate
  translate(ship.pos.x, ship.pos.y);
  rotate(ship.dir.heading());
  scale(ship.scale)

  // Define el centro de la imagen
  translate(-ship.img.width/2, -ship.img.height/2)
  image(ship.img, 0, 0, 0,0)
  pop();


  rect (300,300, 50,50);

  sun.show();
  // === ======= -------- BODIES --------- ======= ===
  for (let i = 0; i < planets.length ; i++) {
    sun.attract(planets[i]);
    planets[i].update();
    planets[i].show();
  }


  if (KEYS['ArrowUp'] || KEYS['w']){
    ship.acel += 0.1
  } else if(KEYS['ArrowDown'] || KEYS['s']){
    ship.acel += 0.1;
  } else {
    ship.acel *= 0.99; 
  }
  // ship.acel = constrain(ship.acel,-10,10)

  if (KEYS['ArrowRight'] || KEYS['d']){
    ship.dir.rotate(0.05)
  } 
  if(KEYS['ArrowLeft'] || KEYS['a']){
    ship.dir.rotate(-0.05)
  }
  // if (abs(ship.acel)>0.1){
    
  // }

  ship.pos.add(
    ship.dir
        .copy()
        .normalize()
        .mult(ship.acel)
  );


  

}



// function setup() {
//   createCanvas(windowWidth,windowHeight)
//   sun = new Body(50,createVector(0,0),createVector(0,0))

//     // Initialise the planets
//   for (let i = 0; i < numPlanets; i++) {
//     let mass = random(5, 15)
//     let radius = random(sun.d, min(windowWidth/2,windowHeight/2))
//     let angle = random(0, TWO_PI)
//     let planetPos = createVector(radius * cos(angle), radius * sin(angle))

//     // Find direction of orbit and set velocity
//     let planetVel = planetPos.copy()
//     if (random(1) < 0.1) planetVel.rotate(-HALF_PI)
//     else planetVel.rotate(HALF_PI)  // Direction of orbit
//     planetVel.normalize()
//     planetVel.mult( sqrt((G * sun.mass)/(radius)) ) // Circular orbit velocity
//     planetVel.mult( random( 1-destabilise, 1+destabilise) ) // create elliptical orbit

//     planets.push( new Body(mass, planetPos, planetVel) )
//   }
// }

// function draw() {
//   background(180)
//   translate(width/2, height/2)
//   for (let i = numPlanets-1; i >= 0; i--) {
//     sun.attract(planets[i])
//     planets[i].move()
//     planets[i].show()
//   }
//   sun.show()
// }