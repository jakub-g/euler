#!/usr/bin/env node

var inputTxt = require('fs').readFileSync('input.txt').toString().replace(/(\r)?\n$/,'');
var aNums = inputTxt.replace(/\r/g,'').split('\n');

console.dir(aNums);

var carry = 0;
var outputNum = "";
for (var idx = 49; idx >= 0; idx--) {
  var sum = carry;
  for (var j = 0; j < aNums.length; j++) {
  	var num = aNums[j]
  	var digit = Number(num.charAt(idx))
  	//console.log(digit)
  	sum += digit
  }
  var outputDigit = sum % 10;
  outputNum = String(outputDigit) + String(outputNum);
  carry = (sum - outputDigit) / 10;
  console.log('idx=',idx, 'sum=',sum, 'carry=', carry)
}
var totalSum = String(carry) + String(outputNum);
console.log("First 10 digits of the sum: " + totalSum.slice(0,10));