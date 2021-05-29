const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
var hero1;
var hero2;
var plant1;
var plant2;
var score=0;
var keypadsound;
var obstaclesGroup;
var gameState=0;
var gameover;
var gameoverimg;
var enemy;
var win;
var winimg;
var hill;


function preload(){
  hero2=loadImage("HERO1.webp")
  plant2=loadImage("PLANT.webp")
  keypadsound=loadSound("jump.mp3")
  gameoverimg=loadImage("GAMEOVER.webp")
  enemy=loadImage("bat1.webp")
  winimg=loadImage("win.png")
  hill=loadImage("hill.webp")
}
function setup() {
  createCanvas(1200,600);
  //createSprite(400, 200, 50, 50);
  hero1=createSprite(200,300,20,20)
  hero1.scale=0.1
  hero1.addImage(hero2)
  plant1=createSprite(1100,300,20,20)
  plant1.addImage(plant2)
  plant1.scale=0.09
  obstaclesGroup=new Group()

  
}

function draw() {
  background("yellow"); 

  
  if(gameState===0){
   
    if(keyDown(UP_ARROW)){
      hero1.velocityY=-6
      hero1.velocityX=0
      keypadsound.play()
    }
    if(keyDown(DOWN_ARROW)){
      hero1.velocityY=6
      hero1.velocityX=0
      keypadsound.play()
    }
    if(keyDown(LEFT_ARROW)){
      hero1.velocityY=0
      hero1.velocityX=-6
      keypadsound.play()
    }
    if(keyDown(RIGHT_ARROW)){
      hero1.velocityY=0
      hero1.velocityX=6
      keypadsound.play()
    }
    spawnObstacles()
    textSize(15)
    fill("red")
    text("MOVE THE HERO WITH THE 4 ARROW KEYS",430,100)

    if(hero1.isTouching(plant1)){
      plant1.x= random(50, displayWidth-50)
      plant1.y= random(50, displayHeight-50)
      score = score + Math.round(getFrameRate()/60);
    }

    if(hero1.isTouching(obstaclesGroup)){
      gameState=1
    }
    
  }
  else if (gameState===1){
    //obstaclesGroup.velocityX=6
    //obstaclesGroup.velocityY=0
      obstaclesGroup.destroyEach();
      plant1.destroy();
      hero1.destroy();
    //textSize(65)
    //fill("orange")
    //text("GAME OVER",500,300)
      gameover=createSprite(600,300,50,50)
      gameover.addImage(gameoverimg)
      gameover.scale=2.7

    if(score===3){
      obstaclesGroup.destroyEach();
      plant1.destroy();
      hero1.destroy();
      win=createSprite(600,300,50,50)
      win.addImage(winimg)
      win.scale=2.5
    }
  }

       textSize(20)
       fill("orange")
       stroke("yellow")
       text("Score: "+ score, 500,50);
  
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%65 ===0){
      var obstacle=createSprite(displayWidth,random(50, displayHeight-50),20,20)
      //obstacle.addImage(enemy)
      //obstacle.scale=0.06
      obstacle.velocityX=random(-10,-15)
      obstacle.velocityY=random(-2,2)
      obstacle.lifetime=displayWidth/obstacle.velocityX
      obstaclesGroup.add(obstacle)
   }

}