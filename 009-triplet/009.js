#!/usr/bin/env node

function getb(a) {
  return 1000 * ((500 - a)/(1000 - a))
}

function getc(a,b){
  return 1000 - a - b
}

function checkInvariants(a,b,c) {
  return Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c) &&
    a > 0 && b > 0 && c > 0 &&
    a < 1000 && b < 1000 && c < 1000 &&
    (a < b) && (b < c) &&
    (a + b + c === 1000) && (a*a + b*b === c*c);
}

function main(){
  for (var a = 1; a < 1000; a++) {
    var b = getb(a);
    var c = getc(a,b);
    var ok = (checkInvariants(a,b,c));

    console.log('a=',a,'b=',b,'c=',c, ok?"OK":"FAIL");

    if (ok) {
      console.log("PRODUCT abc = " + a*b*c);
      break;
    }
  }
}
main()


