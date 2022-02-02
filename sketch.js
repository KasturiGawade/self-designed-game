var canvas, backgroundImage;

var i=5

var gameState = 1;
var playerCount;

var database;
var form;
var background1, backgroundImage;
var rocket;
var alienImg1,alienImg2,alienImg3,alienImg4,
alienImg5,alienImg6,alienImg7,alienImg8,alienImg9,alienImg10;

var bullet, rocket, meteor, meteorImg, bulletImg, rocketImg;

var alien, aliensGroup, bulletsGroup;

var gunSound, pointSound, missileSound, overSound;

var restart, gameOver, restartImg, gameOverImg;

var score=0;

function preload(){
  backgroundImage= loadImage("images/space3.jpg");
  alienImg1=loadImage("images/alien1.png");
  alienImg2=loadImage("images/alien2.png");
  alienImg3=loadImage("images/alien3.png");
  alienImg4=loadImage("images/alien4.png");
  alienImg5=loadImage("images/alien5.png");
  alienImg6=loadImage("images/alien6.png");
  alienImg7=loadImage("images/alien7.png");
  alienImg8=loadImage("images/alien8.png");
  alienImg9=loadImage("images/alien9.png");
  alienImg10=loadImage("images/alien10.png");
  bulletImg=loadImage("images/bullet.png");
  rocketImg=loadImage("images/rocket - final.png");

  meteorImg=loadAnimation("images/meteor2.gif");

  gunSound=loadSound("images/space gun1.wav");
  pointSound=loadSound("images/points1.mp3");
  missileSound=loadSound("images/missile1.mp3");
  overSound=loadSound("images/game over.wav");

  restartImg= loadImage("images/restart.png");
  gameOverImg= loadImage("images/gameOver.png");
}

function setup(){

canvas = createCanvas(displayWidth - 20, displayHeight-30);

background1 = createSprite(0, displayHeight/2);
background1.addImage(backgroundImage);
background1.x=background1.width/2
background1.scale=4;
text("You have only five chances", width/2, 10)
text("Chances left : "+i, width-100, 20)
rocket=createSprite(50, displayHeight/2, 40, 10);
rocket.addImage(rocketImg);
rocket.scale=0.95;
rocket.debug=true

aliensGroup=new Group()

bulletsGroup=new Group()

gameOver=createSprite(width/2,height/2-32,30,30);
gameOver.addImage(gameOverImg)
gameOver.scale=0.5
restart=createSprite(width/2,height/2,30,30);
restart.addImage(restartImg);
restart.scale=0.5
restart.visible=false
gameOver.visible=false
}


function draw(){
background("white");
textSize(20);
text("You have only five chances", width/2, 10)
text("Chances : "+i, width-100, 20)

if(gameState===1){
  background1.velocityX=-3

if(keyDown("down")){
rocket.y=rocket.y+5
}

if(keyDown("up")){
  rocket.y=rocket.y-5
  }

if(keyDown("D")){
  rocket.rotation=rocket.rotation+10
}

if(keyDown("A")){
  rocket.rotation=rocket.rotation-10
}

  if(background1.x<0){
  background1.x=background1.width/2
  }

  if(keyDown("right")){
  bullets()
  gunSound.play();
  }
  
  if(aliensGroup.x>rocket.x){
  lifeOver()
  }
if(bulletsGroup.isTouching(aliensGroup)){
  score=score+5
  pointSound.play()
}

  alienAttack()
}

if(gameState===0){
  background1.velocityX=0
  aliensGroup.destroyEach()
  bulletsGroup.destroyEach()
  restart.visible=true
  gameOver.visible=true
}
if(mousePressedOver(restart)){
  restart.visible=false
  gameOver.visible=false
  gameState=1
}
drawSprites()
}

function lifeOver(){
  if(i>=5){
    i = i-1
    gameState=1
  }
  else {
    gameState=0
  missileSound.play()
}
}

function alienAttack(){
if(frameCount%60===0){
  var alien=createSprite(width-10,random(10,height-20))
  alien.velocityX=-3;
  var rand=Math.round(random(1,10))
  switch(rand){
     case 1:alien.addImage(alienImg1)
     break
     case 2:alien.addImage(alienImg2)
     break
     case 3:alien.addImage(alienImg3)
     break
     case 4:alien.addImage(alienImg4)
     break
     case 5:alien.addImage(alienImg5)
     break
     case 6:alien.addImage(alienImg6)
     break
     case 7:alien.addImage(alienImg7)
     break
     case 8:alien.addImage(alienImg8)
     break
     case 9:alien.addImage(alienImg9)
     break
     case 10:alien.addImage(alienImg10)
     break
     default:break
  }
  alien.scale=1
  alien.lifetime=300
  alien.debug=true
  aliensGroup.add(alien)

  }
}

function bullets(){
   bullet=createSprite(rocket.x+90,rocket.y+5);
   bullet.velocityX=10
   bullet.addImage(bulletImg);
   bullet.scale=0.2
   bulletsGroup.add(bullet);
   
}


