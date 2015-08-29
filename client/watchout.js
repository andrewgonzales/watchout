// start slingin' some d3 here.

var width = 500; // enemy width, height
var height = 500;
var enemyRadius = 25;
var heroRadius = 20;
var collisionCount = 0;
var enemyCount = 20;
var collisionFlag = false;

var enemyCoords = []; //enemyCoords.length -> number of asteroids
var gameBoard = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    

 gameBoard.append("circle")
    .attr("class", "hero")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", heroRadius)
    .attr("fill", "orange")
    // .call(drag);

var hero = gameBoard.select("circle");
var drag = d3.behavior.drag()
  .on("drag", function(d, i) {
    d3.select(this).attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
    
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
    .attr("xlink:href","asteroid.png")
    .attr("width", enemyRadius)
    .attr("height", enemyRadius)
    .attr("x", function(d){ return d[0] })
    .attr("y", function(d) {return d[1]})
    // .text(function(d) {return d});
}
createEnemies(enemyCount);

function randomLocation() {
  var x = Math.floor(Math.random() * (width - 50));
  var y = Math.floor(Math.random() * (height - 50));
  return [x, y];
}

setInterval(function() {
  for (var i = 0; i < enemyCoords.length; i++) {
    enemyCoords[i] = randomLocation();
  }
  d3.selectAll("image")
    .data(enemyCoords)
    .transition()
    .duration(1500)
    .attr("x", function(d){ return d[0] })
    .attr("y", function(d) {return d[1]});
   
  if(collisionFlag){

    collisionFlag = false;
  }
}, 1500);


setInterval(function(){
  //check each asteroid position for collision
  var currentDistance;
  var nodes = d3.selectAll("image");
  hero.attr("fill", "orange");
  d3.selectAll("image")
    .each(function(d, i) {
      var x = d3.select(this).attr("x");
      var y = d3.select(this).attr("y");
      currentDistance = distance(x, y);
      if (currentDistance < enemyRadius + heroRadius - 10) {
        hero.attr("fill", "green");
        if (!collisionFlag) {
          collisionCount++;
          d3.select(".collisionCount").text(collisionCount);
        }
        collisionFlag = true;

      }
    });
}, 10);

var distance = function(enemyX, enemyY){
  var heroX = hero.attr("cx");
  var heroY = hero.attr("cy");
  var a = Math.pow((heroX - enemyX), 2);
  var b = Math.pow((heroY - enemyY), 2);
  return Math.sqrt(a + b);
}




