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
    for (var i = 0; i < skuList.length; i++) {
        if (!items_1.productExists(skuList[i])) {
            return -1;
        }
    }
    var productsToBuy = skuListToProductsMap(skuList);
    console.log(productsToBuy);
    var price = calculatePriceOfAllProducts(productsToBuy);
    var reductions = calculateReductions(productsToBuy);
    var total = price - reductions;
    console.log(skus + "price:" + price + " reductions:" + reductions + " total:" + total);
    return total;
}
exports.checkout = checkout;
function skuListToProductsMap(skuList) {
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
    // if (sku === 'A') {
    //     return calculateMultipleOfferPrice(quantity, product.price, 3, 130);
    // }
    // if (sku === 'B') {
    //     return calculateMultipleOfferPrice(quantity, product.price, 2, 45);
    // }
    return product.price * quantity;
}
exports.calculatePriceOfProduct = calculatePriceOfProduct;
function calculateReductions(products) {
    var reduction = 0;
    var offer;
    while (offer = findBestOffer(products)) {
        if (offer.products) {
            deductProducts(products, offer.products);
            reduction += calculatePriceOfAllProducts(offer.products) - offer.price;
        }
        if (offer.productGroup) {
            var productsToDeduct = getMostExpensiveProductGroupProducts(products, offer.productGroup, offer.quantity);
            deductProducts(products, productsToDeduct);
            reduction += calculatePriceOfAllProducts(productsToDeduct) - offer.price;
        }
    }
    return reduction;
}
exports.calculateReductions = calculateReductions;
function findBestOffer(products) {
    var bestOffer = null;
    var bestReduction = 0;
    items_1.offers.forEach(function (offer) {
        var reduction = 0;
        if (offer.products) {
            var offerProducts = offer.products;
            if (productContainProducts(products, offerProducts)) {
                reduction = calculatePriceOfAllProducts(offerProducts) - offer.price;
            }
        }
        if (offer.productGroup) {
            if (productContainsProductInGroup(products, offer.productGroup, offer.quantity)) {
                var productsToDeduct = getMostExpensiveProductGroupProducts(products, offer.productGroup, offer.quantity);
                reduction = calculatePriceOfAllProducts(productsToDeduct) - offer.price;
            }
        }
        if (reduction > bestReduction) {
            bestReduction = reduction;
            bestOffer = offer;
        }
    });
    return bestOffer;
}
function productContainsProductInGroup(products, productGroup, quantity) {
    var numberOfProductsInGroup = 0;
    productGroup.forEach(function (sku) {
        if (products[sku]) {
            numberOfProductsInGroup += products[sku];
        }
    });
    return numberOfProductsInGroup >= quantity;
}
function getMostExpensiveProductGroupProducts(products, productGroup, quantity) {
    var orderedProductGroup = orderProductGroupBuyPrice(productGroup);
    var numberOfProductsStillRequired = quantity;
    var productGroupProducts = {};
    for (var i = 0; i < orderedProductGroup.length; i++) {
        var sku = orderedProductGroup[i];
        if (products[sku]) {
            if (products[sku] > numberOfProductsStillRequired) {
                productGroupProducts[sku] = numberOfProductsStillRequired;
                numberOfProductsStillRequired = 0;
            }
            else {
                productGroupProducts[sku] = products[sku];
                numberOfProductsStillRequired -= products[sku];
            }
        }
        if (numberOfProductsStillRequired === 0) {
            return productGroupProducts;
        }
    }
}
function orderProductGroupBuyPrice(productGroup) {
    return productGroup.sort(function (sku1, sku2) {
        var price1 = getProduct(sku1).price;
        var price2 = getProduct(sku2).price;
        if (price1 < price2) {
            return 1;
        }
        if (price1 > price2) {
            return -1;
        }
        return 0;
    });
}
function productContainProducts(products, productsToContain) {
    var containsProducts = true;
    Object.keys(productsToContain)
        .forEach(function (product) {
        var numberToContain = productsToContain[product];
        var numberHas = products[product] || 0;
        if (numberHas < numberToContain) {
            containsProducts = false;
        }
    });
    return containsProducts;
}
function deductProducts(products, productsToDeduct) {
    Object.keys(productsToDeduct)
        .forEach(function (product) {
        products[product] -= productsToDeduct[product];
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
//# sourceMappingURL=checkout.js.map