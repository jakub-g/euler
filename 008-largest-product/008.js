#!/usr/bin/env node

var input = require('fs').readFileSync('input.txt').toString().replace(/\r\n/g, "");
// console.log(input.length);

function getProductOfSlice(input, startIndex, sliceLen){
    var sliceTxt = input.substr(startIndex, sliceLen);
    if (sliceTxt.length < sliceLen) {
        return 0;
    }
    if (sliceTxt.indexOf('0') > -1) {
        return 0;
    }
    var sliceArr = sliceTxt.split('');
    var product = sliceArr.reduce(function(acc, item){
        return Number(item) * acc;
    }, 1);
    return product;
}

function main() {
    var sliceLen = 13;
    var bestProduct = -1;
    var bestIndex = -1;
    for (var i = 0; i < input.length; i++) {
        var product = getProductOfSlice(input, i, sliceLen);
        if (product > bestProduct) {
            bestProduct = product;
            bestIndex = i;
      }
    }
    console.log("BEST SLICE:   " + input.substr(bestIndex, sliceLen));
    console.log("BEST PRODUCT: " + bestProduct);
}

main();
