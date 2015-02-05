#!/usr/bin/env iojs

function factorial(n) {
  if (n == 0) return 1
  return n * factorial(n-1)
}

function perm(seekedPos, alphabet, acc) {
  if (typeof acc == "undefined") acc = ""
  console.info(acc + " / " + seekedPos + " / " + alphabet)

  var digits = alphabet.length
  if (digits == 0) return acc

  var subChunksPerLeader = factorial(digits - 1)
  var newLeaderPos = Math.ceil(seekedPos / subChunksPerLeader) - 1 // 0-based
  var newSeekedPos = seekedPos - newLeaderPos * subChunksPerLeader
  var newLeader = alphabet[newLeaderPos]
  acc = acc + newLeader

  // remove new leader from new alphabet
  var newLeaderIdxInAlphabet = alphabet.indexOf(newLeader)
  var newAlphabet = alphabet.slice(0)
  newAlphabet.splice(newLeaderIdxInAlphabet, 1)
  return perm(newSeekedPos, newAlphabet, acc)
}

function main() {
  return perm(1000000, [0,1,2,3,4,5,6,7,8,9])
}

console.log(main())
