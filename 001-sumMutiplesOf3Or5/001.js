#!./node.sh
'use strict';

/**
* @param Generator gen
* @return Generator
*/
let GeneratorFilter = function (gen, filterCb) {
  let genf = function* () {
    for (let val of gen) {
      if (filterCb(val)) {
        yield val;
      }
    }
  }
  return genf();
}

/**
* @param Generator gen
* @param Function reduceCb
* @param MultiType initialValue
* @return MultiType
**/
let GeneratorReduce = function (gen, reduceCb, initialValue) {
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
    let gen0to999 = range(0, 999);
    let gen0to999multiple3or5 = GeneratorFilter(gen0to999, x => (x % 3 == 0 || x % 5 == 0));
    let sum = GeneratorReduce(gen0to999multiple3or5, (x, y) => (x + y));
    return sum // 233168
}

console.log(main()) // tested in Firefox 34
