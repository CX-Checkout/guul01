
import {checkout} from "../../lib/solutions/checkout";

exports['should return -1 on invalid input'] = function (test) {
    test.equal(checkout(), -1);
    test.equal(checkout(null), -1);
    test.equal(checkout(null), -1);
    test.done();
};
