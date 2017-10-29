
import {checkout, deliminator} from "../../lib/solutions/checkout";

export function shouldReturnMinusOneOnInvalidInput(test) {
    test.equal(checkout(), -1);
    test.equal(checkout(null), -1);
    test.equal(checkout({}), -1);
    test.equal(checkout([3]), -1);
    test.done();
}

export function shouldReturnTheCorrectPriceForItemA(test) {
    test.equal(checkout('A'), 50);
    test.done();
}

export function shouldReturnTheCorrectPriceFor2ItemsA(test) {
    test.equal(checkout('A' + deliminator + 'A'), 100);
    test.done();
}

export function shouldReturnTheCorrectPriceFor3ItemA(test) {
    test.equal(checkout('A' + deliminator + 'A'), 130);
    test.done()
}
