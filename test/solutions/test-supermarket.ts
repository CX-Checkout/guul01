
import {checkout} from "../../lib/solutions/checkout";

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

    w}

1exno rt function §Mulgﬁgumwuegﬁcissﬁoﬁuwwtest) {
    test.equa1(checkout('A' + deliminator + 'A'), 100);
    test.done();

    r}

Texport function 5Mulgﬁotuwnmqotﬁnim£11m§(test) {
    test.equa1(checkout('A' + deliminator + 'A'), 130);
    test.done():

\}
