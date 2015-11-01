#!/usr/bin/env node
var cache_hits = 0;
var cache_misses = 0;

var verbose = false;

function next(n) {
    var ret;
    if (n % 2 == 0) {
        ret = n / 2;
    } else {
        ret = 3*n + 1;
    }
    // process.stdout.write(ret + " ");
    return ret;
}

var CACHED_LENGTHS = {};

function getCollatzChainLen(startNo) {
    if (startNo === 1)
        return 1

    if (CACHED_LENGTHS[startNo]) {
        cache_hits++;
        return CACHED_LENGTHS[startNo];
    }
    cache_misses++;

    var nextNumber = next(startNo);
    var len = 1 + getCollatzChainLen(nextNumber);

    CACHED_LENGTHS[startNo] = len;
    return len;
}

function main() {
    var bestStartNo = -1;
    var longestChainLen = -1;
    for (var startNo = 999999; startNo > 1; startNo--) {
	var len = getCollatzChainLen(startNo);
	if (len > longestChainLen) {
	    longestChainLen = len;
	    bestStartNo = startNo;
	}
	if (verbose || startNo % 1000 === 0) {
	  if (verbose) {
            console.log("STARTING NO = " + startNo);
	    console.log("COLLATZ LEN = " + len);
	  }
	  console.log(startNo + ": so far the best is starting number " + bestStartNo + 
	    " with Collatz length of " + longestChainLen + "\n");
	  console.log("Cache hit ratio: " + (cache_hits / cache_misses).toFixed(2))
	}
    }

    console.log(bestStartNo + "/len=" + longestChainLen);
}

main();
