'use strict';

import {IOffer, IProductMap, items, offers, productExists} from "./items";

export const deliminator = '';

export function checkout(skus: string) {
    console.log(skus);
    if (typeof skus !== 'string') {
        return -1;
    }
    if (skus.length === 0) {
        return 0;
    }
    const skuList = skus.split(deliminator);
    for (let i = 0; i < skuList.length; i++) {
        if (!productExists(skuList[i])) {
            return -1;
        }
    }
    let productsToBuy = skuListToProductsMap(skuList);
    console.log(productsToBuy)
    let price = calculatePriceOfAllProducts(productsToBuy);
    let reductions = calculateReductions(productsToBuy);
    let total = price - reductions;
    console.log(skus + "price:" + price + " reductions:" + reductions + " total:" + total);
    return total;
}

function skuListToProductsMap(skuList): IProductMap {
    let products = {};
    skuList.forEach((sku) => {
        products[sku] = products[sku] ? products[sku] + 1 : 1
    });
    return products;
}

export function calculatePriceOfAllProducts(products: IProductMap) {
    let price = 0;
    Object.keys(products)
        .forEach((productSku) => {
            price += calculatePriceOfProduct(productSku, products[productSku]);
        });
    return price;
}

export function calculatePriceOfProduct(sku, quantity) {
    let product = getProduct(sku);
    // if (sku === 'A') {
    //     return calculateMultipleOfferPrice(quantity, product.price, 3, 130);
    // }
    // if (sku === 'B') {
    //     return calculateMultipleOfferPrice(quantity, product.price, 2, 45);
    // }
    return product.price * quantity;
}

export function calculateReductions(products: IProductMap) {
    let reduction = 0;

    let offer: IOffer;
    while (offer = findBestOffer(products)) {
        if (offer.products) {
            deductProducts(products, offer.products);
            reduction += calculatePriceOfAllProducts(offer.products) - offer.price
        }
        if (offer.productGroup) {
            let productsToDeduct = getMostExpensiveProductGroupProducts(products, offer.productGroup, offer.quantity);
            deductProducts(products, productsToDeduct);
            reduction += calculatePriceOfAllProducts(productsToDeduct) - offer.price
        }
    }
    return reduction;
}

function findBestOffer(products, offer) {
    let bestOffer = null;
    let bestReduction = 0;
    offers.forEach((offer: IOffer) => {
        let reduction = 0;
        if (offer.products) {
            const offerProducts = offer.products;
            if (productContainProducts(products, offerProducts)) {
                reduction = calculatePriceOfAllProducts(offerProducts) - offer.price
            }
        }
        if (offer.productGroup) {
            if (productContainsProductInGroup(products, offer.productGroup, offer.quantity)) {
                let productsToDeduct = getMostExpensiveProductGroupProducts(products, offer.productGroup, offer.quantity);
                reduction = calculatePriceOfAllProducts(productsToDeduct) - offer.price
            }
        }

        if (reduction > bestReduction) {
            bestReduction = reduction;
            bestOffer = offer
        }
    });

}

function productContainsProductInGroup(products: IProductMap, productGroup: string[], quantity: number) {
    let numberOfProductsInGroup = 0;
    productGroup.forEach(sku => {
        if (products[sku]) {
            numberOfProductsInGroup += products[sku]
        }
    });
    return numberOfProductsInGroup >= quantity;
}


function getMostExpensiveProductGroupProducts(products: IProductMap, productGroup: string[], quantity: number) {
    let orderedProductGroup = orderProductGroupBuyPrice(productGroup);
    let numberOfProductsStillRequired = quantity;
    let productGroupProducts = {};
    for (let i = 0; i < orderedProductGroup.length; i++) {
        let sku = orderedProductGroup[i];
        if (products[sku]) {
            if (products[sku] > numberOfProductsStillRequired) {
                productGroupProducts[sku] = numberOfProductsStillRequired;
                numberOfProductsStillRequired = 0;
            } else {
                productGroupProducts[sku] = products[sku];
                numberOfProductsStillRequired -= products[sku];
            }
        }
        if (numberOfProductsStillRequired === 0) {
            return productGroupProducts
        }
    }
}

function orderProductGroupBuyPrice(productGroup) {
    return productGroup.sort((sku1, sku2) => {
        const price1 = getProduct(sku1).price;
        const price2 = getProduct(sku2).price;
        if (price1 < price2) {
            return 1;
        }
        if (price1 > price2) {
            return -1;
        }
        return 0;
    })
}

function productContainProducts(products: IProductMap, productsToContain: IProductMap) {
    let containsProducts = true;
    Object.keys(productsToContain)
        .forEach(product => {
            const numberToContain = productsToContain[product];
            const numberHas = products[product] || 0;
            if (numberHas < numberToContain) {
                containsProducts = false;
            }
        });
    return containsProducts;
}

function deductProducts(products, productsToDeduct) {
    Object.keys(productsToDeduct)
        .forEach(product => {
            products[product] -= productsToDeduct[product];
        })
}

function getProduct(sku) {
    let product = items[sku];
    if (!product) {
        throw new Error('No such product' + sku);
    }
    return product;
}

function calculateMultipleOfferPrice(quantity, price, multibuy, multibuyPrice) {
    let numberOfMultibuys = Math.floor(quantity / multibuy);
    let quantityAfterMultiBuy = quantity - (numberOfMultibuys * multibuy);
    return numberOfMultibuys * multibuyPrice + quantityAfterMultiBuy * price;
}
