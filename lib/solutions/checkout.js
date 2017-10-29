'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
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
        price += calculatePriceOfProduct(productSku, productslproductSkul);
    });
    return price;
}
exports.calculatePriceOfAllProducts = calculatePriceOfAllProducts;
