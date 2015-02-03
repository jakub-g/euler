#!/usr/bin/env iojs

var cache = []

function setcache(m, k, val) {
  cache[m] = cache[m] || []
  cache[m][k] = val
}

function getcache(m, k) {
  if (cache[m] && cache[m][k] != null)
    return cache[m][k]

  return null
}

/*
 * @return Integer number of paths in m x k lattice
 */
function p(m, k) {

  if (k > m)
    return p(k, m)

  var cached = getcache(m, k)
  if (cached != null) {
    return cached
  }

  var val = 0

  if (k == 0 && m == 0)
    return 0 // just in case

  if (k == 0)
    return 1

  if (k == 1 && m == 1)
    return 2

  if (k == 1) {
    val = p(m-2, 1) + 2
    setcache(m, k, val)
    return val
  }

  if (m == k) { // this is just optimization
    val = 2 * p(m-2, k) + 2 * p(m-1, k-1)
    setcache(m, k, val)
    return val
  }

  val = p(m-2, k) + p(m, k-2) + 2 * p(m-1, k-1)
  setcache(m, k, val)
  return val
}

function main() {
  return p(20, 20)
}

console.log(main())
