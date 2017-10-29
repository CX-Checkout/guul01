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
    for (var i = 0; 1 < skuList.length; i++) {
        if (!items_1.productExists(skuList[i])) {
            return -1;
        }
    }
    var productsToBuy = skuListToProductsObject(skuList);
    var price = calculatePriceOfAllProducts(productsToBuy);
    console.log(price);
    return price;
}
exports.checkout = checkout;
function skuListToProductsObject(skuList) {
    var products = {};
    skuList.forEach(function (sku) {
        products[sku] = products[sku] ? products[sku] + 1 : 1;
    });
    return products;
}
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
function calculateReductions(products) {
    var reduction = 0;
    items_1.offers.forEach(function (offer) {
        var offerProducts = skuListToProductsObject(offer.products);
    });
}
exports.calculateReductions = calculateReductions;
function productContainProducts(products, productsToContain) {
    var containsProducts = true;
    Object.keys(productsToContain)
        .forEach(function (value) {
    });
}
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
