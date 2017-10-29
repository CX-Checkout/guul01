'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//noinspection JSUnusedLocalSymbols
function checkout(skus) {
    if (!Array.isArray(skus)) {
        return -1;
    }
    for (var i = 0; i < skus.length; i++) {
        if (typeof skus[i] !== 'string') {
            return -1;
        }
    }
}
exports.checkout = checkout;