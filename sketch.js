
var gameState = 0;

var player,playeranimation;
var ground, invisibleGround;
var obstaclesGroup,obstacle1,obstacle2,obstacl3,obstacle4;
var rewardsGroup,reward1Img,reward2Img,reward3Img;
var newGroup;

var rand;


function preload(){
playeranimation =loadAnimation("IMAGES/1.png","IMAGES/2.png","IMAGES/3.png","IMAGES/4.png","IMAGES/5.png",
"IMAGES/6.png","IMAGES/7.png","IMAGES/8.png");
obstacle1 = loadImage("IMAGES/OB1.png");
obstacle2 = loadImage("IMAGES/OB2.png");
obstacle3 = loadImage("IMAGES/OB3.png");
obstacle4 = loadImage("IMAGES/OB4.png");
reward1Img = loadImage("IMAGES/REW1.png");
reward2Img = loadImage("IMAGES/REW2.png");
reward3Img = loadImage("IMAGES/REW3.png");


}

function setup() {
  createCanvas(800,400);
  player = createSprite(100, 250, 50, 50);
  player.addAnimation("running",playeranimation);
  player.setCollider("rectangle",0,0,30,70)
  player.scale = 1.7;

  ground = createSprite(400,360,800,20);
  ground.x = ground.width /2; 
  ground.velocityX = -4; 
  ground.visible = false;

  invisibleGround = createSprite(355,370,400,10); 
  invisibleGround.visible = false;
 
  obstaclesGroup = new Group();
  reward1Group = new Group();
  reward2Group = new Group();
  reward3Group = new Group();

  
}


function draw() {
  background(0); 
  player.collide(ground); 
  
//gameState 
if (gameState === 0){
  if(keyDown("space")&& player.y >= 130) {
     player.velocityY = -10; 
    }
    player.velocityY = player.velocityY + 0.8;

    if (ground.x < 0){ 
      ground.x = ground.width/2;
     }
rand =  Math.round(random(1,2))
     if(rand===1){
       spawnObstacles();
     }
     else if (rand ===2 ){
       spawnRewards();
     }


  if(obstaclesGroup.isTouching(player)){ 
 gameState = 1;
 removeSpr();
 textSize(15);
 fill("white");
 text("GAMEOVER",100,100);
  }

}
 else if(gameState === 1 ){
  end();
  }
 player.collide(invisibleGround);
 console.log(gameState);
  drawSprites();

}


function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,330,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 250;
    obstacle.depth = player.depth;
    player.depth = obstacle.depth+1;
    //add each obstacle to the group
    
    obstaclesGroup.add(obstacle);
  }
}
function spawnRewards(){
  if(frameCount%200 === 0){
   
    var ran = Math.round(random(1,3))

    if(ran === 1 ){
      reward1();
    }
    else if (ran === 2){
      reward3();
    }

    else{
      reward2();
    }

    
  }
}
function reward1() {
  var rew1 = createSprite(600,330,10,40);
  rew1.addImage(reward1Img);
  rew1.scale = 0.2 ;
  rew1.velocityX = -4;
  rew1.lifetime = 250;
  reward1Group.add(rew1);
  rew1.depth = player.depth;
  player.depth = rew1.depth+1;
}

function reward2() {
  var rew2 = createSprite(600,330,10,40);
  rew2.addImage(reward2Img);
  rew2.scale = 0.3;
  rew2.velocityX = -4;
  rew2.lifetime = 250;
  reward2Group.add(rew2);
  rew2.depth = player.depth;
  player.depth = rew2.depth+1;
}

function reward3(){
  var rew3 = createSprite(600,330,10,40);
  rew3.addImage(reward3Img);
  rew3.scale = 0.3;
  rew3.velocityX = -4;
  rew3.lifetime = 250;
  reward3Group.add(rew3);
  rew3.depth = player.depth;
  player.depth = rew3.depth+1;
}

function end(){
  ground.velocityX = 0;
  player.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  reward1Group.setVelocityXEach(0);
  reward1Group.setLifetimeEach(-1);
  reward2Group.setVelocityXEach(0);
  reward2Group.setLifetimeEach(-1);
  reward3Group.setVelocityXEach(0);
  reward3Group.setLifetimeEach(-1);
}

function removeSpr(){
  player.remove();
}