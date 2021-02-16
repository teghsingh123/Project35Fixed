//Create variables here
var dog,dogIm, HappyDog,database,foodS,foodStock,feed,addFood,fedTime,lastFed,foodObj;
function preload()
{
  //load images here
  dogIm = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500 , 500);
  
  dog = createSprite(200,200,0,0);
  dog.addImage(dogIm);
  dog.scale = 0.15

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  textSize(20);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  foodObj = new Foods();
}


function draw() {  
background(46,139,87);
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});
foodObj.display(); 
drawSprites();
  //add styles here
textSize(10);
fill("white");
stroke("black");
textSize(13);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<= 0){
    x=0;
  }else{
    x=x-1;
  }
 
  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(HappyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}