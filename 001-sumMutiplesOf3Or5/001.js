#!/bin/sh nodeharmony.sh
'use strict';

let arg2 = process.argv[2];
if(arg2 == "--quiet" || arg2 == "-q") {
    console.info = function () {}
}

/**
* A constructor function that wraps a Generator to make it chainable
* @param Generator gen
* @return CGen chainable generator
*/
let CGen = function (gen) {
    // make it possible to use "CGen(gen)" instead of "new CGen(gen)"
    if (!(this instanceof CGen)) {
        return new CGen(gen);
    }
    this.generator = gen;
}

/**
* @param Function filterCb
* @return CGen
*/
CGen.prototype.filter = function (filterCb) {
  let gen = this.generator;
  let genf = function* () {
    for (let val of gen) {
      if (filterCb(val)) {
        console.info('[filter] yielding ' + val);
        yield val;
      }
    }
  }
  return CGen(genf());
}

/**
* @param Function reduceCb
* @param MultiType initialValue
* @return MultiType
**/
CGen.prototype.reduce = function (reduceCb, initialValue) {
    let gen = this.generator;
    const iteratorSymbol = (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
    if (!gen[iteratorSymbol]) {
        throw new Error("first argument must be a generator");
    }

    let acc = initialValue || 0;
    for (let val of gen) {
        acc = reduceCb (acc, val);
        console.info('[reduce] acc = ' + acc);
    }
    console.info('[reduce] returning ' + acc);
    return acc;
}


/**
* @type GeneratorFunction (function*)
* @param Integer a
* @param Integer b
* @yields Integer+
*/
let range = function *(a, b) {
  let i = a;
  while (i <= b){
    console.info('[range]  yielding ' + i);
    yield i++;
  }
}

let main = function () {
    let sum = CGen(range(0, 999))
        .filter(x => (x % 3 == 0 || x % 5 == 0))
        .reduce((x, y) => (x + y));
    return sum // 233168
}

console.log(main()) // tested in Firefox 34 and iojs 1.0.4 harmony
