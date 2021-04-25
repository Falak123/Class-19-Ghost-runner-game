var PLAY = 1;
var END = 0;
var gameState = PLAY;

var towerImg,tower;
var ghost,ghostImg;
var door,doorImg;
var climber, climberImg;
var invisibleBlock;
var spookySound;

function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
createCanvas(600,600);

tower = createSprite(300,300);
tower.addImage("tower", towerImg);
tower.velocityY = 1;  
  
ghost = createSprite(200,200);
ghost.addImage("ghost", ghostImg);
ghost.scale = 0.4;  
  
  
doorG = new Group();
climberG = new Group();
invisibleBlockG = new Group(); 
  
spookySound.loop();  
  
}

function draw(){
 background(0);
  
  if(gameState === PLAY){
    
  if(tower.y > 400){
    
    tower.y = height/2;
    
  }
    
   if(keyDown("left_arrow")){
     ghost.x = ghost.x-3;
   } 
    
    if(keyDown("right_arrow")){
     ghost.x = ghost.x+3;
   } 
    
   if(keyDown("space")) {
     ghost.velocityY = -10;
     
   }
    
   ghost.velocityY = ghost.velocityY+0.5; 
  
spawnDoors();
    
   if(climberG.isTouching(ghost)){
     
     ghost.velocityY = 0;
   } 
    
    if(invisibleBlockG.isTouching(ghost) || ghost.y >600){
      
      ghost.destroy();
      gameState = END;
    }
    
    drawSprites();
    
  }
  
  
  

  
  if(gameState === END){
    textSize(30);
    fill("red");
    text("Game Over",230,250);
    spookySound.stop();
    
  }
  
  
  
}

function spawnDoors(){
 
if(frameCount % 240 === 0) { 
  
door = createSprite(Math.round(random(120,400)),-50);
door.addImage("door", doorImg);
door.velocityY = 1;
door.lifetime = 600;  
  
ghost.depth = door.depth;
ghost.depth += 1;
  
climber = createSprite(200,10);
climber.addImage("climber", climberImg);
climber.x = door.x; 
climber.velocityY = 1;
climber.lifetime = 600;
  
invisibleBlock = createSprite(200,15,climber.width,2);
invisibleBlock.x = door.x;
invisibleBlock.velocityY =1;
invisibleBlock.lifetime = 600;
  
invisibleBlock.debug = true;  
  
  
invisibleBlockG.add(invisibleBlock);  
  
climberG.add(climber);  
  
doorG.add(door);  
  
}
}