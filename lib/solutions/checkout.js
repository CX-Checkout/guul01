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
function checkout(skus) {
    if (typeof skus !== 'string') {
        return -1;
    }
    var skuList = skus.split(',');
    var price = 0;
    var productsToBuy = {};
    skuList.forEach(function (sku) {
        productsToBuy[sku] = productsToBuy[sku] ? productsToBuy[sku] + 1 : 1;
    });
}
exports.checkout = checkout;
