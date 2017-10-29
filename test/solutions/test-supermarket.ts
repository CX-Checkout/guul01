
import {checkout, deliminator} from "../../lib/solutions/checkout";

export function shouldReturnMinusOneOnInvalidInput(test) {
    test.equal(checkout(), -1);
    test.equal(checkout(null), -1);
    test.equal(checkout({}), -1);
    test.equal(checkout([3]), -1);
    test.done();
}

export function shouldReturnMinus1ForInvalidProducts(test) {
    test.equal(checkout('a'), -1);
    test.equal(checkout('Aa'), -1);
    test.done();
}

export function shouldReturnTheCorrectPriceForItemA(test) {
    test.equal(checkout('A'), 50);
    test.equal(checkout('AA'), 100);
    test.equal(checkout('AAAAA'), 200);

    test.done();
}
//
// export function shouldReturnTheCorrectPriceForB(test) {
//     test.equal(checkout('BBB'), 75);
//     test.equal(checkout('BBBB'), 90);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceFor5A(test) {
//     test.equal(checkout('AAAAA'), 200);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceForEEEEBB(test) {
//     test.equal(checkout('EEEEBB'), 160);
//     test.equal(checkout('BEBEEE'), 160);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceForABCDEABCDE(test) {
//     test.equal(checkout('ABCDEABCDE'), 280);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceForFF(test) {
//     test.equal(checkout('FF'), 20);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceForHHHHH(test) {
//     test.equal(checkout('HHHHH'), 45);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceForHHHHHHHHHH(test) {
//     test.equal(checkout('HHHHHHHHHH'), 80);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceForAll(test) {
//     test.equal(checkout('KK'), 150);
//     test.equal(checkout('NNNM'), 120);
//     test.equal(checkout('PPPPP'), 200);
//     test.equal(checkout('QQQ'), 80);
//     test.equal(checkout('RRRQ'), 150);
//     test.equal(checkout('UUUU'), 120);
//     test.equal(checkout('VV'), 90);
//     test.equal(checkout('VVV'), 130);
//     test.done()
// }
//
// export function shouldReturnTheCorrectPriceForProductGroups(test) {
//     test.equal(checkout('STX'), 45);
//     test.equal(checkout('SSS'), 45);
//     test.done()
// }
//
// export function shouldSelectTheMostExpensiveProductsFromProductGroups(test) {
//     test.equal(checkout('STXZ'), 45 + 17);
//     test.done()
// }
