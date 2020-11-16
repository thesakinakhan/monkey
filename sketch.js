var monkey, monkey_running, monkeyI, monkeyC;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var f;
var ground, Gimage;
var play = 1;
var end = 0;
var gamestate = play;
var IG

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkeyC = loadAnimation("sprite_0.png");

  monkeyI = loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  Gimage = loadImage("G.png")

}



function setup() {

  createCanvas(600, 400);

  ground = createSprite(300, 360, 1300, 20);
  ground.x = 400;
  ground.velocityX = -5;
  ground.addImage(Gimage);
  ground.scale = 0.2;

  monkey = createSprite(50, 290, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop",monkeyI)
  monkey.scale = 0.15;

  foodGroup = createGroup();
  obstacleGroup = createGroup();

  IG = createSprite(300, 340, 600, 10);
  IG.visible = false;

}


function draw() {
  
 // monkey.debug = true;

  background("lightblue");

  if (gamestate === play) {

    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = 400;
    }
    console.log(ground.x);

    if (keyDown("space")) {
      monkey.velocityY = -14;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score = score + 1;
    }

    bananas();
    obstacles();

    if (monkey.isTouching(obstacleGroup)) {
      gamestate = end;
    }

  }

  if (gamestate === end) {
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    foodGroup.velocityX = 0;
    obstacleGroupvelocityX = 0;
    ground.velocityX = 0;
    monkey.changeAnimation("stop", monkeyI);
    textSize(35);
    fill("red");
    text("GAME OVER", 200, 200);
    textSize(20);
    fill("grey");
    text("press r to restart", 225, 250);
    reset();
  }



  monkey.collide(IG);

  drawSprites();

  textSize(25);
  fill("black");
  text("score:" + score, 300, 30);
}

function bananas() {
  if (World.frameCount % 70 === 0) {
    banana = createSprite(400, 150, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.y = Math.round(random(100, 150));
    banana.velocityX = -5;
    foodGroup.add(banana);
    foodGroup.setLifetime = 100;
  }

}

function obstacles() {
  if (World.frameCount % 110 === 0) {
    obstacle = createSprite(400, 313, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.x = Math.round(random(350, 400));
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetime = 100;

  }

}

function reset() {
  if (keyDown("r")) {
    gamestate = play;
    score = 0;
    monkey.changeAnimation("running", monkey_running);
  }
}