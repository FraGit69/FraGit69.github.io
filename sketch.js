var bgImg;
var x1 = 0;
var x2;
let nLevels = 5;
let max = 4800;
let initY;

let xL1 = max/(nLevels+1);
let xL2 = xL1*2;
let inizio = true;

let speed;
let vy = 0.1; // velocità verticale
let gravity = 0.1; // gravità
let pos =0;
let goRight = false;
let goLeft = false;
let goUp = false;
let mouse = false;
let shift = false;
let shoot = false;

//sblocco livelli
let livello2 = false;
let livello3 = false;

let home = false;
let resume = false;
let replay = false;
let game = false;

let option = false;
let livello = 0;
let currentLevel = livello;

let rectWidth = 300;
let rectHeight = 60;

let numEnemy;
let enemiesGenerated;
let enemies = [];
let oggettiRilasciati = [];
let spawnTime = 1000; // Tempo in millisecondi tra lo spawn di ogni nemico
let lastSpawnTime = 0; // L'ultimo momento in cui è stato generato un nemico
let maxEnemies = 100; // Numero massimo di nemici che possono essere generati contemporaneamente

let showTime = 3000; // Durata in millisecondi durante la quale l'immagine sarà mostrata
let startTime; // Il momento in cui inizia a mostrare l'immagine
let showImage = false; // Variabile per controllare se mostrare l'immagine o no

function preload(){
	bgImg = loadImage("./img/strada.gif");
  enemy = loadImage("./img/voldemort.png");
  optionBar = loadImage("./img/optionBar.png");
  level2 = loadImage("./img/livello.png");
  levelLocked2 = loadImage("./img/livelloBloccato.png");
  level1 = loadImage("./img/livello1.png");
  casaL1 = loadImage("./img/casaL1.png");
  sparo = loadImage("./img/sparo.gif");
  ak47 = loadImage("./img/ak-47.png");
  pistol = loadImage("./img/pistol.png");
  enemyImg = loadImage("./img/zombie.gif");
  lost = loadImage("./img/GameOver.jpg");
  won = loadImage("./img/vittoria.jpeg");
  benda = loadImage("./img/bende.png");
  ricarica = loadImage("./img/proiettile.png")

  OldLondon = loadFont("./font/OldLondon.ttf");
  Creepy = loadFont("./font/Creepycall.ttf");
  Victory = loadFont("./font/The Victory.ttf");
}

function setup() { 
  createCanvas(bgImg.width*3, bgImg.height*3);
  x = width / 2;
  x2 = width;
  frameRate(60);
  player = new Personaggio(10, height-400, 100, 100, 20, enemy);
  arma = new Arma(3, 45, ak47, 5);
  arma2 =  new Arma(10, 50, pistol, 1);
  player.addArma(arma);
  player.addArma(arma2);
} 

function keyPressed() {
  lettere = "WAD"
  if(keyCode === LEFT_ARROW || keyCode === lettere.charCodeAt(1)) {
    goLeft = true;  
  }
  if(keyCode === RIGHT_ARROW || keyCode === lettere.charCodeAt(2)) {
    goRight = true;
  }
  if(keyCode === UP_ARROW || keyCode === lettere.charCodeAt(0)){
    goUp = true;
  }
  if(keyCode === SHIFT){
    shift = true;
  }
  if(keyCode === ESCAPE){
    if(livello!=0){
      if(!option){
        currentLevel = livello;
        livello = 2;
        filter(BLUR, 3);
        option = !option;
        setTimeout(() => {}, 300);
      }else{
        filter(BLUR, -3);
        livello = currentLevel;
        option = ! option;
        setTimeout(() => {}, 300);
      }
    }
  }
  if(keyCode === ENTER && livello === 1){
    if(player.x>xL1-level1.width/2 && player.x<xL1+level1.width/2)
      livello=4;
    if(player.x>xL2-level2.width/2 && player.x<xL2+level2.width/2 && livello2){
      livello=5;
    }
  }
}

function keyReleased() {
  lettere = "WAD"
  if(keyCode == LEFT_ARROW || keyCode === lettere.charCodeAt(1)) {
    goLeft = false;
  }
    if(keyCode == RIGHT_ARROW || keyCode === lettere.charCodeAt(2)) {
    goRight = false;
  }
  if(keyCode === UP_ARROW || keyCode === lettere.charCodeAt(0)){
    goUp = false;
  }
  if(keyCode === SHIFT){
    shift = false;
  }
}

function mousePressed() {
  if(livello  === 0){
    // Controlla se il mouse è sopra il rettangolo quando viene cliccato
    let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
    let rectY = (height - rectHeight) / 2; // Posizione Y del rettangolo
    if (mouseX > rectX && mouseX < rectX + rectWidth && mouseY > rectY && mouseY < rectY + rectHeight)
      livello = 1; //Imposto il livello a 1
  }
  else if(livello === 2){
    if(home){
      livello = 1;
      inizio = true;
    }
    if(resume){
      livello = currentLevel;
    }
    if(replay){
      livello = currentLevel;
      inizio = true;
    }
    player.bullets = [];
    option = !option;
  }
  else if(livello > 2)
    shoot = true;
  
}

function mouseReleased() {
  if(livello > 2)
    shoot = false;
}

function mouseWheel(event) {
  // Incrementa o decrementa il numero progressivo in base alla direzione della rotellina
  if(livello > 2 && player.inventory.length > 0)
    if (event.delta > 0)
      player.setArma(1)
    else
      player.setArma(-1);
}

function draw() {
  if (livello === 0) {
    menuStart();
  } else if(livello === 1){
    sceltaLivello();
  } else if(livello === 2){
    optionMenu();
  } else if(livello === 3){
    victoryGameOver();
  } else if(livello === 4){
    levelOne();
  } else if(livello === 5){
    levelTwo();
  }

}

function menuStart() {
  background(0); // Sfondo nero
  let rectX = (width - rectWidth) / 2; // Posizione X del rettangolo
  let rectY = (height - rectHeight) / 2; // Posizione Y del rettangolo
  let borderRadius = 20;

  fill(255); //Coloro di bianco
  textSize(40); //Grandezza testo
  text("TITOLO VIDEOGIOCO", width / 2, height / 6);
  textSize(20);
  text("BY FRANCESCO RE", width / 2, height / 4);
  
  // Disegna il rettangolo
  fill(255, 0, 0); // Colore rettangolo
  stroke(255); // Colore del contorno bianco
  strokeWeight(2); // Spessore del contorno
  rectMode(CORNER); // Imposta il modo di disegnare il rettangolo al vertice in alto a sinistra
  rect(rectX, rectY, rectWidth, rectHeight, borderRadius);
  // Testo da centrare nel rettangolo
  noStroke(); // Rimuove il contorno
  textSize(30); // Imposta la dimensione del testo
  fill(0); // Colore del testo bianco
  text("Clicca qui per giocare", width / 2, height / 2); // Disegna il testo al centro del rettangolo
  textAlign(CENTER);
}

function optionMenu() {
  rectMode(CORNER); // Imposta il modo di disegnare il rettangolo al vertice in alto a sinistra
  image(optionBar, 50, 50, width-100, height-100);
  textAlign(CENTER);
  fill(0);
  let size = 60
  textSize(size);
  let spaceBetween = 10;
  textFont(OldLondon);
  let posY = height /4;
  text("PAUSE", width/2, posY);
  posY = posY+spaceBetween*3+size;
  if(mouseX > width/2-200 && mouseX < width/2+200 && mouseY > posY-size && mouseY < posY){
    fill(255, 0, 0);
    home = true;
  }
  else{
    fill(0);
    home = false;
  } 
  text("HOME", width/2, posY);
  posY = posY+spaceBetween+size
  if(mouseX > width/2-200 && mouseX < width/2+200 && mouseY > posY-size && mouseY < posY){
    fill(255, 0, 0);
    resume = true;
  }
  else{
    fill(0);
    resume = false;
  } 
  text("RESUME", width/2, posY);
  posY = posY+spaceBetween+size
  if(mouseX > width/2-200 && mouseX < width/2+200 && mouseY > posY-size && mouseY < posY){
    fill(255, 0, 0);
    replay = true;
  }
  else{
    fill(0);
    replay = false;
  }
  text("REPLAY", width/2, posY);
}


function sceltaLivello(){
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);
  let show;
  image(level1, xL1-level1.width/2, 160, level1.width, level1.height);
  if(livello2)
    show = level2;
  else show = levelLocked2;
  image(show, xL2-level2.width/2, 160, level2.width, level2.height);

  x = player.getX();
  speed = player.getSpeed();
  if (goLeft) {
    if(pos>0 && x<=width/2){
      x1 += speed;
      x2 += speed;
      xL1 += speed;
      xL2 += speed;
      pos -= speed;
      player.x = width/2-1;
      player.setSpeed(0);
    }
  }

  if (goRight) {
    if(pos<max && x >= width/2){
      x1 -= speed;
      x2 -= speed;
      xL1 -= speed;
      xL2 -= speed;
      pos += speed;
      player.x= width/2+1;
      player.setSpeed(0);
    }
  }

  if(goUp){
    if(pos<max && x === width/2){
        player.setSpeed(0);
    }
  }
  //movimento dello sfondo
  if (x1 <= -width){
    x1 = width;
  } else if(x1 >= width)
  x1 = -width;
  if (x2 <= -width){
    x2 = width;
  }else if(x2 >= width)
    x2 = -width;
  
  if(x>xL1-level1.width/2 && x<xL1-level1.width/2){

  }
  player.update();
  player.move();
  player.show(sparo);
  player.setSpeed(speed);
}

function victoryGameOver(){
  if(inizio){
    startTime = millis();
    inizio = !inizio;
  }else if ( millis() - startTime > 2000){
    inizio = !inizio;
    livello = 1;
  }
  if(game)
    image(won, 0, 0, width, height);
  else
    image(lost, 0, 0, width, height);
}

function levelOne(){
  if(inizio){
    player.x = 10;
    inizio= false;
    initY = player.yInit;
    enemies = [];
    numEnemy = 0;
    enemiesGenerated = 0;
  }else {
    if(player.health>0){
      player.update();
      player.move();
      image(casaL1, 0, 0, width, height);
      if (enemiesGenerated < 5 ) {
        if(enemies.length!=1){
          let enemy = new Nemico(width, height-470, 200, 200, 20, 1, 0.1, enemyImg);
          enemies.push(enemy);
          enemiesGenerated++;
        }
      }
      if(enemies.length!=0)

        for (let i =0; i<enemies.length; i++) {
          player.show(sparo, enemies[i]);
          if(enemies[i].health<=0){
            enemies.splice(i, 1);
            i-1;
            numEnemy++;
          }else{
            enemies[i].show();
            enemies[i].move(player);
            enemies[i].attack(player);
          }
        }
      
      if(numEnemy===5){
        player.bullets = [];
        enemies = [];
        player.y = initY;
        player.yInit = player.y; 
        livello2 = true;
        inizio = true;
        pos = 0;
        x1 = 0;
        x2 = width;
        xL1 = max/(nLevels+1);
        xL2 = xL1*2;
        shoot = false;
        game = true;
        livello = 3;
      }  
    }else{
      player.health = player.maxHealt;
      player.bullets = [];
      enemies = [];
      player.y = initY;
      player.yInit = player.y; 
      inizio = true;
      pos = 0;
      x1 = 0;
      x2 = width;
      xL1 = max/(nLevels+1);
      xL2 = xL1*2;
      shoot = false;
      game = false;
      livello = 3;
    }
  }
}

function levelTwo(){
  if(inizio){
    player.x = 10;
    inizio= false;
    initY = player.yInit;
    enemies = [];
    numEnemy = 0;
    enemiesGenerated = 0;
    var init = true;
  }else {
    if(player.health>0){
      player.update();
      player.move(player);
      image(casaL1, 0, 0, width, height);
      let currentTime = millis(); // Ottieni il tempo corrente
      if (enemiesGenerated < 10 && currentTime - lastSpawnTime > spawnTime) {
        let enemy = new Nemico(width, height-470, 200, 200, random(20, 40), random(1, 3), random(0.1, 5), enemyImg);
        enemies.push(enemy);
        enemiesGenerated++;
        lastSpawnTime = currentTime; // Aggiorna l'ultimo momento di spawn
      }
      if(enemies.length!=0)

        for (let i =0; i<enemies.length; i++) {
          player.show(sparo, enemies[i]);
          if(enemies[i].health<=0){
            enemies.splice(i, 1);
            i-1;
            numEnemy++;
          }else{
            enemies[i].show();
            enemies[i].move(player);
            enemies[i].attack(player);
          }
        }
      
      if(numEnemy===20){
        player.bullets = [];
        enemies = [];
        player.y = initY;
        player.yInit = player.y; 
        inizio = true;
        pos = 0;
        x1 = 0;
        x2 = width;
        xL1 = max/(nLevels+1);
        xL2 = xL1*2;
        shoot = false;
        game = true;
        livello = 3;
      }  
    }else{
      player.health = player.maxHealt;
      player.bullets = [];
      enemies = [];
      player.y = initY;
      player.yInit = player.y; 
      inizio = true;
      pos = 0;
      x1 = 0;
      x2 = width;
      xL1 = max/(nLevels+1);
      xL2 = xL1*2;
      shoot = false;
      game = false;
      livello = 3;
    }
  }
}