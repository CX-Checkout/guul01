
import {checkout} from "../../lib/solutions/checkout";

export function shouldReturnMinusOneOnInvalidInput(test) {
    test.equal(checkout(), -1);
    test.equal(checkout(null), -1);
    test.equal(checkout({}), -1);
    test.equal(checkout([3]), -1);
    test.done();
};
