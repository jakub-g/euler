#!/bin/sh nodeharmony.sh
//#!/bin/sh
// sed '1,2d' "$0" | node --harmony_arrow_functions "$@"; exit $?
'use strict';

let arg2 = process.argv[2];
if(arg2 == "--quiet" || arg2 == "-q") {
    console.info = function () {}
}

const MAX_3DIGIT = 999;
const MIN_3DIGIT = 100;

/**
* Return an array of pairs whose sum is `sum` and whose items are no greater than `maxItemValue`.
* getPairs(17, 10) = [{9,8},{10,7}]
* The order is guaranteed to come from the middle, i.e. from pairs whose product is biggest.
* @yields {a: Integer, b: Integer}+
**/
function* getPairs(sum, maxItemValue) {
    let half = sum / 2;
    let a = Math.ceil(half);
    for (;;) {
        let b = sum - a;
        console.info({a:a, b:b, product:a*b})
        yield {a:a, b:b};
        ++a
        if (a > maxItemValue) {
            return;
        }
    }
}

/**
* @param n Integer
* @return Boolean
*/
function isPalindrome(n) {
    let str = n.toString();
    return str.split("").reverse().join("") === str;
}

/**
* Calculates biggest palindrome that is a product of two three-digit numbers
* Iterates through pairs of three-digit numbers in descending-like order,
* diagonally (towards top-right) over a squared table, starting from the bottom-right
* corner:
*        .
*      . 9
*    . 8 6
*    7 5 4
*      3 2
*        1
*/
function main() {
    for (var sum = 2 * MAX_3DIGIT; sum >= 2 * MIN_3DIGIT; sum--) {
        let pairs = getPairs(sum, MAX_3DIGIT);
        for (let pair of pairs) {
            let product = pair.a * pair.b;
            if (isPalindrome(product)) {
                console.log(pair.a, pair.b);
                return product;
            }
        }
    }
    return -1;
}

console.log(main())