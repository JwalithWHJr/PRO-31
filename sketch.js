const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var particles;
var plinkos = [];
var divisions =[];
var particle;

var divisionHeight=300;
var score =0;
var count = 0;
var gameState ="start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,375));
    }
    
}
 
function draw() {
  background("pink");

  textSize(18);
  text("Score : "+score,20,40);
  fill("white");

  textSize(15);
  text("You have 15 chances to increase your score",250,20);
  fill("white");
  
  textSize(23)
  text(" 100 ", 5, 550);
  text(" 100 ", 80, 550);
  text(" 100 ", 160, 550);
  text(" 100 ", 240, 550);
  text(" 50 ", 320, 550);
  text(" 50 ", 400, 550);
  text(" 50 ", 480, 550);
  text(" 25 ", 560, 550);
  text(" 25 ", 640, 550);
  text(" 25 ", 720, 550);
  Engine.update(engine);
  ground.display();
  
  if ( gameState =="end") {
    textSize(90);
    fill("black");
    text("Game Over", 150, 300);
  }

  

  

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
    if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>760)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+100;      
                  particle=null;

                  if ( count>= 15) gameState ="end";                          
              }


              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 50;
                    particle=null;

                    if ( count>= 15) gameState ="end";

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 25;
                    particle=null;

                    if ( count>= 15)  gameState ="end";

              }      
              
        }
  
      }

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
 
}


function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
     particle=new Particle(mouseX, 10, 10, 10); 
  }   
}