var dog,sadDog,happyDog;
var database;
var feedTime,lastfed;
var feed;
var food,foodI;

function preload(){
  sadDog = loadImage("Images/dog.png");
  happyDog = loadImage("Images/happy dog.png");
}

function setup(){
  database = firebase.database();
  createCanvas(1000,400);

  dog = createSprite(800,200,100,100);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  food = new Food();

  feedTime = database.ref('feedTime');
  feedTime.on("value",function(data){
  lastfed = data.val();
  });

  feed = createButton("feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addfood = createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFoods);
  
}

function draw(){
  background(46,139,87);

  fill(255,255,254);
  textSize(15);
  food.display();
  
  if(lastfed>=12){
    text("LastFeed : " + lastfed%12+ " pm",350,30)
  }else if(lastfed==0){
    text("LastFeed : 12 Am",350,30)
  }else{
    text("LastFeed : " + lastfed + " am",350,30);
  }

  drawSprites();
}

function addFoods(){
  foodS++
  database.ref('/').update({
  food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  food.updatefoodStock(food.getFoodStock()-1);
  database.ref('/').update({
  Food:food.getFoodStock(),
  feedTime:time
  })
}