#!/usr/bin/env iojs

var COINS = [1,2,5,10,20,50,100,200]

/**
 * Returns number of distinct ways to make `amount` using `n` lowest-denominated coins
 * The assumption is that the amount is a multiple of the lowest-denominated coin
 */
function w(n, amount) {
  if (n == 1) return 1

  var coinValue = COINS[n-1]
  var maxUsages = Math.floor(amount / coinValue)

  var sum = 0
  for (var usages = maxUsages; usages >= 0; usages--) {
    sum += w(n-1, amount - usages * coinValue)
  }
  return sum
}

function main() {
  return w(8, 200)
}

console.log(main())
