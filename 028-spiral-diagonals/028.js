#!/usr/bin/env iojs
function s(n) {
  if (n == 1) return 1
  return s(n-2) + 4*n*n - 6*n + 6
}

console.log(s(1001))
