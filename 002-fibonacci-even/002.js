#!/bin/sh nodeharmony.sh
'use strict';

let arg2 = process.argv[2];
if(arg2 == "--quiet" || arg2 == "-q") {
    console.info = function () {}
}

/**
* A constructor function that wraps a Generator to make it chainable.
* @param Generator|Function* gen
* @return CGen chainable generator
*/
let CGen = function (gen) {
    // make it possible to use "CGen(gen)" instead of "new CGen(gen)"
    if (!(this instanceof CGen)) {
        return new CGen(gen);
    }
    // we may get a GeneratorFunction (function*) instead of a Generator as a param
    if (typeof gen == 'function') {
        gen = gen();
    }
    this.generator = gen;
}

/**
* @param Function filterCb Function(element, index)
* @return CGen
*/
CGen.prototype.filter = function (filterCb) {
  let gen = this.generator;
  let genf = function* () {
    let idx = 0;
    for (let val of gen) {
      ++idx
      if (filterCb(val, idx)) {
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

let fibonacci = function* () {
    let MAX = 4000000;
    let a = 1, b = 2, c;
    console.info('[fibo]   yielding ' + a);
    yield a
    console.info('[fibo]   yielding ' + b);
    yield b
    
    for (;;) {
      c = a + b
      if ( c > MAX) {
        return
      }
      console.info('[fibo]   yielding ' + c);
      yield c
      a = b
      b = c
    }
}

let main = function () {
    let sum = CGen(fibonacci)
        .filter((x, idx) => (x % 2 == 0))
        .reduce((x, y) => (x + y));
    return sum // 4.....2
}

console.log(main()) // tested in Firefox 34 and iojs 1.0.4 harmony
