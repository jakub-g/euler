#!/usr/bin/env node

var inputTxt = require('fs').readFileSync('input.txt').toString().replace(/(\r)?\n$/,'');
var ints = inputTxt.replace(/\r/g,'').split('\n').map(function(row){
  return row.split(' ').map(function(cell) {
    return parseInt(cell);
  });
});

console.dir(ints);

var DIM = ints.length; // assuming it's square

function getGlobalCell(row, col) {
  return ints[row][col];
}

function maxProdXY(getCell, maxCells) {
  var CACHE = {};
  
  // cache is indexed by i-th element, and contains product of ith and i+1th item
  // precalculate pairwise products of neighbors
  for (var i = 0; i+1 < maxCells; i++) {
    var prod = getCell(i) * getCell(i+1);
    CACHE[i] = prod
  }

  // now all pairwise partials are in memory, just need to multiply them
  var maxProd = 0
  for (var i = 0; i+3 < maxCells; i++) {
    var prod = CACHE[i] * CACHE[i+2];
    if (prod > maxProd) {
      maxProd = prod;
    }
  }

  return maxProd;
}

function maxProdDown(col) {
  var getCell = function(row) {
    return getGlobalCell(row, col);
  }
  return maxProdXY(getCell, DIM);
}

function maxProdRight(row) {
  var getCell = function(col) {
    return getGlobalCell(row, col);
  }
  return maxProdXY(getCell, DIM);
}

function maxProdRightDown(startingRow, startingCol) {
  var getCell = function(idx) {
    return getGlobalCell(startingRow + idx, startingCol + idx);
  }
  return maxProdXY(getCell, DIM - (startingCol + startingRow));
}
function maxProdLeftDown(startingRow, startingCol) {
  var getCell = function(idx) {
    //console.log("getting " + idx);
    var row = startingRow + idx;
    var col = startingCol - idx;
    //console.log("resolvedRow=" + row + "; resolvedCol=" + col);
    if (row >= 0 && col >= 0) {
      return getGlobalCell(row, col);
    } else {
      return 0;
    }
  }
  return maxProdXY(getCell, 1 + (startingCol - startingRow));
}

function main() {
  function setGlobalMax(val) {
    if (val > globalMaxProd) {
        globalMaxProd = val;
    }
  }      
  var globalMaxProd = 0;

  for (var col=0; col < DIM; col++) {
    var prod = maxProdDown(col);
    setGlobalMax(prod);
    console.log("COL " + col + "; maxprod = " + prod);
  }

  for (var row=0; row < DIM; row++) {
    var prod = maxProdRight(row);
    setGlobalMax(prod);
    console.log("ROW " + row + "; maxprod = " + prod);
  }
  
  for (var startingRow=0; startingRow < DIM; startingRow++) {
    var startingCol = 0;
    var prod = maxProdRightDown(startingRow, startingCol);
    setGlobalMax(prod);
    console.log("CROSS_DOWN_RIGHT from (row="+startingRow+",col="+startingCol+"); maxprod = " + prod);
  }
  
  // col=1th cause 0th col and 0th row have the same starting point (0,0)
  for (var startingCol=1; startingCol < DIM; startingCol++) {
    var startingRow = 0;
    var prod = maxProdRightDown(startingRow, startingCol);
    setGlobalMax(prod);
    console.log("CROSS_DOWN_RIGHT from (row="+startingRow+",col="+startingCol+"); maxprod = " + prod);
  }
  
  
  for (var startingCol=0; startingCol < DIM; startingCol++) {
    var startingRow = 0;
    var prod = maxProdLeftDown(startingRow, startingCol);
    setGlobalMax(prod);
    console.log("CROSS_DOWN_LEFT from (row="+startingRow+",col="+startingCol+"); maxprod = " + prod);
  }
  
  for (var startingRow=1; startingRow < DIM; startingRow++) {
    var startingCol = DIM - 1;
    var prod = maxProdLeftDown(startingRow, startingCol);
    setGlobalMax(prod);
    console.log("CROSS_DOWN_LEFT from (row="+startingRow+",col="+startingCol+"); maxprod = " + prod);
  }
  
  console.log("GLOBAL MAX IS: " + globalMaxProd);
}

main();