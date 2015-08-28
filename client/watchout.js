// start slingin' some d3 here.

var width = 500; // enemy width, height
var height = 500;
var dataset = [[1, 1],[2,2],[3, 3], [4,4] ,[5,5]]; //dataset.length -> number of asteroids
var gameBoard = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    
gameBoard.append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 100)
    .attr("fill", "orange");

// var enemy = d3.select("svg").selectAll("enemy")
//   .data([1])
//   .enter()
//   .append("div")
//   .attr("class", "enemy");

var drawElements = function() {
  gameBoard.selectAll("image")
    .data(dataset)
    // .transition()
    .attr("xlink:href","asteroid.png")
    .attr("width", "50")
    .attr("height", "50")
    .attr("x", function(d){ return d[0] })
    .attr("y", function(d) {return d[1]})
    .enter()
    .append("image")
    .text(function(d) {return d});
}
drawElements();

function randomLocation() {
  var x = Math.floor(Math.random() * (width - 50));
  var y = Math.floor(Math.random() * (height - 50));
  return [x, y];
}

setInterval(function() {
  //modify dataset, computing random locations for each element
  //then call drawElements with new dataset
  for (var i = 0; i < dataset.length; i++) {
    dataset[i] = randomLocation();
  }
  d3.selectAll("image")
    .data(dataset)
    .transition()
    .attr("xlink:href","asteroid.png")
    .attr("width", "50")
    .attr("height", "50")
    .attr("x", function(d){ return d[0] })
    .attr("y", function(d) {return d[1]})
  // drawElements(dataset);
}, 1000);


  // gameBoard.selectAll("circle")
  //   .data([5, 2])
  //   .attr("fill","green")
  //   .enter()
  //   .append("circle")
  //   .attr("cx", 50)
  //   .attr("cy", 50)
  //   .attr("r", 50)
  //   .text(function(d) {return d});

