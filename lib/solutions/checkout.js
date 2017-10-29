'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var items_1 = require("./items");
exports.deliminator = ',';
function checkout(skus) {
    if (typeof skus !== 'string') {
        return -1;
    }
    var skuList = skus.split(exports.deliminator);
    var price = 0;
    var productsToBuy = {};
    skuList.forEach(function (sku) {
        productsToBuy[sku] = productsToBuy[sku] ? productsToBuy[sku] + 1 : 1;
    });
    return calculatePriceOfAllProducts(productsToBuy);
}
exports.checkout = checkout;
function calculatePriceOfAllProducts(products) {
    var price = 0;
    Object.keys(products)
        .forEach(function (productSku) {
        price += calculatePriceOfProduct(productSku, products[productSku]);
    });
    return price;
}
exports.calculatePriceOfAllProducts = calculatePriceOfAllProducts;
function calculatePriceOfProduct(sku, quantity) {
    return items_1.items[sku].price * quantity;
}
exports.calculatePriceOfProduct = calculatePriceOfProduct;
