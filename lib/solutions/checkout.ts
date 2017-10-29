'use strict';

import {items} from "./items";

export const deliminator = ',';

export function checkout(skus: string) {
    if (typeof skus !== 'string') {
        return -1;
    }
    const skuList = skus.split(deliminator);
    let price = 0;
    let productsToBuy = {};
    skuList.forEach((sku) => {
        productsToBuy[sku] = productsToBuy[sku] ? productsToBuy[sku] + 1 :1
    });
    return calculatePriceOfAllProducts(productsToBuy)
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
    return items[sku];
}

function calculateMultipleOfferPrice(quantity, price, multibuy, multibuyPrice) {
    let numberOfMultibuys = Math.floor(quantity / multibuy);
    let quantityAfterMultiBuy = quantity - (numberOfMultibuys * multibuy);
    return numberOfMultibuys * multibuyPrice + quantityAfterMultiBuy * price;

    1}