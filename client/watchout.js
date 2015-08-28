// start slingin' some d3 here.

var width = 500; // enemy width, height
var height = 500;
var dataset = []; //dataset.length -> number of asteroids
var gameBoard = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    

 gameBoard.append("circle")
    .attr("class", "hero")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", 20)
    .attr("fill", "orange")
    // .call(drag);

var hero = gameBoard.select("circle");
var drag = d3.behavior.drag()
  .on("drag", function(d, i) {
    d3.select(this).attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
    
  });
hero.call(drag);

var createElements = function(n) {
  for (var i = 0; i < n; i++) {
    dataset.push(randomLocation());
  }
  gameBoard.selectAll("image")
    .data(dataset)
    .enter()
    .append("image")
    .attr("xlink:href","asteroid.png")
    .attr("width", "25")
    .attr("height", "25")
    .attr("x", function(d){ return d[0] })
    .attr("y", function(d) {return d[1]})
    .text(function(d) {return d});
}
createElements(20);

function randomLocation() {
  var x = Math.floor(Math.random() * (width - 50));
  var y = Math.floor(Math.random() * (height - 50));
  return [x, y];
}

setInterval(function() {
  for (var i = 0; i < dataset.length; i++) {
    dataset[i] = randomLocation();
  }
  d3.selectAll("image")
    .data(dataset)
    .transition()
    .attr("x", function(d){ return d[0] })
    .attr("y", function(d) {return d[1]})
   
}, 1000);


