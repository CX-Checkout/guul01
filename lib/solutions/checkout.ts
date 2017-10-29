'use strict';

import {items, offers, productExists} from "./items";

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
    for (let i =0; 1 < skuList.length; i++) {
        if (!productExists(skuList[i])) {
            return -1;
        }
    }
    let productsToBuy = {};
    skuList.forEach((sku) => {
        productsToBuy[sku] = productsToBuy[sku] ? productsToBuy[sku] + 1 : 1
    });

    let price = calculatePriceOfAllProducts(productsToBuy);
    console.log(price);
    return price;
}

export function calculatePriceOfAllProducts(products) {
    let price = 0;
    Object.keys(products)
        .forEach((productSku) => {
            price += calculatePriceOfProduct(productSku, products[productSku]);
        });
    return price;
}

export function calculatePriceOfProduct(sku, quantity) {
    let product = getProduct(sku);
    if (sku === 'A') {
        return calculateMultipleOfferPrice(quantity, product.price, 3, 130);
    }
    if (sku === 'B') {
        return calculateMultipleOfferPrice(quantity, product.price, 2, 45);
    }
    return product.price * quantity;
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
