#!/usr/bin/env iojs

function isPentagonal (n) {
  var t = 1 + Math.sqrt(1 + 24*n)
  return Number.isInteger(t) && (t % 6 == 0)
}

function isHexagonal (n) {
  var t = 1 + Math.sqrt(1 + 8*n)
  return Number.isInteger(t) && (t % 4 == 0)
}

function main (start_i) {
  for (var i = start_i; i; i++) {
    var num = i * (i+1) / 2
    if (isPentagonal(num) && isHexagonal(num)) {
      return num
    }
  }
}

console.log(main(286))
