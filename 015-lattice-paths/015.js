#!/usr/bin/env iojs

/*
 * @return Integer number of paths in m x k lattice
 */
function p(m, k) {
  if (k > m)
    return p(k, m)

  if (k == 0 && m == 0)
    return 0 // just in case

  if (k == 0)
    return 1

  if (k == 1 && m == 1)
    return 2

  if (k == 1)
    return p(m-2, 1) + 2

  if (m == k) // this is just optimization
    return 2 * p(m-2, k) + 2 * p(m-1, k-1)

  return p(m-2, k) + p(m, k-2) + 2 * p(m-1, k-1)
}

function main() {
  return p(20, 20)
}

console.log(main())
