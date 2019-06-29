// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
//
//    https://projecteuler.net/problem=15
//
// How many such routes are there through a 20×20 grid?

var mathjs = require('mathjs');

var gridXSize = 20;
var gridYSize = 20;

function calculateRightAndDownMovesThroughGrid(x,y){
  // (x+y)!/x!
  // ********** = Answer
  //     y!

  var xAndY = x+y;
  var xAndYFac = mathjs.factorial(xAndY);
  var xFac = mathjs.factorial(x);
  var yFac = mathjs.factorial(y);


  return (xAndYFac/xFac)/yFac;

}

console.log(calculateRightAndDownMovesThroughGrid(gridXSize,gridYSize));
