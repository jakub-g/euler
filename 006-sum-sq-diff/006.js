#!/usr/bin/env node

function sumOfSquares(n) {
  var sum = 0;
  for (var i=1; i<=n; i++) {
    sum += i*i;
  }
  return sum;
}
function squareOfSum(n) {
  var sum = (1+n)*n/2;
  return sum * sum;
}
function main(){
  console.log(squareOfSum(100)-sumOfSquares(100))
}

main()
