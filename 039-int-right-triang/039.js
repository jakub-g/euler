#!/usr/bin/env iojs

function main (upperBound) {
  var solutions = []

  for (var p = 4; p <= upperBound; p += 2) {
    solutions[p] = 0 

    for (var a = 1; a < p / 2; ++a) {
      var b = ( p * (2*a - p) ) / ( 2 * (a-p) )
      if ( a > b )
        break
      if ( Number.isInteger(b) )
        solutions[p]++
    }
  }

  // return index (p) which has biggest value of solutions
  return solutions.reduce(function (prev, curr, idx, arr) {
    if (curr > prev.val) return {
        idx: idx,
	val: curr
    }
    else return prev
  }, {
    idx: -1,
    val: -1
  })
}

console.log(main(1000))
