#!/bin/sh nodeharmony.sh
'use strict';

// Make chainable generator out of a normal Generator
let Gen = function (generator) {
    // make it possible to use "Gen(gen)" instead of "new Gen(gen)"
    if (!(this instanceof Gen)) {
        return new Gen(generator);
    }
    this.generator = generator;
}

/**
* @param Generator gen
* @return Generator
*/
Gen.prototype.filter = function (filterCb) {
  let gen = this.generator;
  let genf = function* () {
    for (let val of gen) {
      if (filterCb(val)) {
        yield val;
      }
    }
  }
  return Gen(genf());
}

/**
* @param Generator gen
* @param Function reduceCb
* @param MultiType initialValue
* @return MultiType
**/
Gen.prototype.reduce = function (reduceCb, initialValue) {
    let gen = this.generator;
    const iteratorSymbol = (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
    if (!gen[iteratorSymbol]) {
        throw new Error("first argument must be a generator");
    }

    let acc = initialValue || 0;
    for (let val of gen) {
        acc = reduceCb (acc, val);
    }
    return acc;
}


/**
* @param Generator gen
* @return GeneratorFunction
*/
let range = function *(a, b) {
  let i = a;
  while (i <= b) yield i++;
}

let main = function () {
    let sum = Gen(range(0, 999))
        .filter(x => (x % 3 == 0 || x % 5 == 0))
        .reduce((x, y) => (x + y));
    return sum // 233168
}

console.log(main()) // tested in Firefox 34 and iojs 1.0.4 harmony
