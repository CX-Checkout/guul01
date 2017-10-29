'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var items_1 = require("./items");
exports.deliminator = '';
function checkout(skus) {
    console.log(skus);
    if (typeof skus !== 'string') {
        return -1;
    }
    if (skus.length === 0) {
        return 0;
    }
    var skuList = skus.split(exports.deliminator);
    var productsToBuy = {};
    skuList.forEach(function (sku) {
        productsToBuy[sku] = productsToBuy[sku] ? productsToBuy[sku] + 1 : 1;
    });
    try {
        var price = calculatePriceOfAllProducts(productsToBuy);
        console.log(price);
        return price;
    }
    catch (e) {
        console.log(e);
        return -1;
    }
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
    var product = getProduct(sku);
    if (sku === 'A') {
        return calculateMultipleOfferPrice(quantity, product.price, 3, 130);
    }
    if (sku === 'B') {
        return calculateMultipleOfferPrice(quantity, product.price, 2, 45);
    }
    return product.price * quantity;
}
exports.calculatePriceOfProduct = calculatePriceOfProduct;
function getProduct(sku) {
    var product = items_1.items[sku];
    if (!product) {
        throw new Error('No such product' + sku);
    }
    return product;
}
function calculateMultipleOfferPrice(quantity, price, multibuy, multibuyPrice) {
    var numberOfMultibuys = Math.floor(quantity / multibuy);
    var quantityAfterMultiBuy = quantity - (numberOfMultibuys * multibuy);
    return numberOfMultibuys * multibuyPrice + quantityAfterMultiBuy * price;
}
