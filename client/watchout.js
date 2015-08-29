// start slingin' some d3 here.

var width = 600; // enemy width, height
var height = 600;
var enemyRadius = 25;
var heroSize = 40;
var currentScore = 0;
var highScore = 0;
var collisionCount = 0;
var enemyCount = 20;
var collisionFlag = false;
var interval = 2500;
var marioCharacters = [
  [ "toad_still.png", "toad_spinning.gif"],
  [ "mario_still.png", "mario_spinning.gif"],
  [ "koopa_still.png", "koopa_spinning.gif"],
  [ "peach_still.png", "peach_spinning.gif"],
  [ "luigi_still.png", "luigi_spinning.gif"],
  [ "donkey_kong_still.png", "donkey_kong_spinning.gif"],
  [ "bowser_still.png", "bowser_spinning.gif"],
  [ "yoshi_still.png", "yoshi_spinning.gif"]
];
var marioEnemy = "red_shell.gif";

var heroCharacters = [
["hero_animated.gif", "hero_hit.gif"]
];
var heroEnemy;

var currentCharacter = getRandomChar(marioCharacters);
var currentEnemy = marioEnemy;
function getRandomChar(characters) {
  return characters[Math.floor(Math.random()* characters.length)];
}
var enemyCoords = []; //enemyCoords.length -> number of asteroids
var gameBoard = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
    

 gameBoard.append("image")
    .attr("class", "hero")
    .attr("x", width/2)
    .attr("y", height/2)
    .attr("width", heroSize)
    .attr("height", heroSize)
    .attr("xlink:href", 'images/' + currentCharacter[0]);

var hero = gameBoard.select(".hero");
var drag = d3.behavior.drag()
  .on("drag", function(d, i) {
    var newX = d3.event.x - heroSize/2;
    var newY = d3.event.y - heroSize/2;
    if (d3.event.x - heroSize/2 < 0){
      newX = 0;
    }
    
    if (d3.event.x + heroSize/2 > d3.select("svg").attr("x") + width) {
      newX = d3.select("svg").attr("x") + width - heroSize;
    }

    if (d3.event.y - heroSize/2< 0) {
      newY = 0;
    }

    if (d3.event.y + heroSize/2 > d3.select("svg").attr("y") + height) {
      newY = d3.select("svg").attr("y") + height - heroSize;
    }

    d3.select(this).attr("x", newX);
    d3.select(this).attr("y", newY);

    
  });
hero.call(drag);

var createEnemies = function(n) {
  for (var i = 0; i < n; i++) {
    enemyCoords.push(randomLocation());
  }
  gameBoard.selectAll("image")
    .data(enemyCoords)
    .enter()
    .append("image")
    .attr("class", "enemy")
    .attr("xlink:href","images/" + currentEnemy)
    .attr("width", enemyRadius)
    .attr("height", enemyRadius)
    .attr("x", function(d){ return d[0];})
    .attr("y", function(d) {return d[1];});
};
createEnemies(enemyCount);

function randomLocation() {
  var x = Math.floor(Math.random() * (width));
  var y = Math.floor(Math.random() * (height));
  var speed = Math.floor(Math.random() * 4);
  return [x, y, speed];
}

setInterval(function() {
  for (var i = 0; i < enemyCoords.length; i++) {
    enemyCoords[i] = randomLocation();
  }
  d3.selectAll(".enemy")
    .data(enemyCoords)
    .transition()
    .duration(interval)
    .attr("x", function(d){ return d[0];})
    .attr("y", function(d) {return d[1];});
   
  if(collisionFlag){
    collisionFlag = false;
    currentCharacter = getRandomChar(marioCharacters);
    d3.select(".hero")
      .attr("xlink:href",'images/' + currentCharacter[0]);
  }
}, interval);


setInterval(function(){
  //check each asteroid position for collision
  var currentDistance;
  var nodes = d3.selectAll(".enemy");
  hero.attr("fill", "green");
  d3.selectAll(".enemy")
    .each(function(d, i) {
      var x = d3.select(this).attr("x");
      var y = d3.select(this).attr("y");
      currentDistance = distance(x, y);
      if (currentDistance < 20) {
        hero.attr("fill", "red");
        if (!collisionFlag) { //first collision in the 1.5 second interval
          collisionCount++;
          d3.select(".collisionCount").text(collisionCount);
          d3.select(".hero")
            .attr("xlink:href", 'images/' + currentCharacter[1]);
        }
        currentScore = 0;
        d3.select(".currentScore").text(currentScore);
        collisionFlag = true;

      }
    });
}, 10);

setInterval(function(){
  currentScore++;
  if(currentScore > highScore){
    highScore = currentScore;
    d3.select(".highScore").text(highScore);
  }
  d3.select(".currentScore").text(currentScore);

}, 10);

var distance = function(enemyX, enemyY){
  var heroX = hero.attr("x");
  var heroY = hero.attr("y");
  var a = Math.pow((heroX - enemyX), 2);
  var b = Math.pow((heroY - enemyY), 2);
  return Math.sqrt(a + b);
};




