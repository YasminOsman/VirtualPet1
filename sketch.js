var dog, dog_img, dog_img1;
var database;
var food, foodstock;

function preload()
{
  dog_img = loadImage('images/dogImg.png');
  dog_img1 = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(dog_img);
  dog.scale = 0.15;
  foodstock = database.ref('Food');
  foodstock.on("value", readStock);
  textSize(20);
}


function draw() {  
  background(46,189,87);
  if(keyWentDown(UP_ARROW)) {
    writeStock(food);
    dog.addImage(dogImg1);

  }
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("food remaining: " + food, 170, 200);
  textSize(13);
  text("note: Press UP ARROW to feed dog milk", 130, 10, 300, 20);
  //add styles here

}

function readStock(data) {
  food = data.val();
}

function writeStock(x) {
  if(x<0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('Food').update({
    x : x

  })
}

