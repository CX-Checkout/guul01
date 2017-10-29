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
            price += calculatePriceOfProduct(productSku, productslproductSkul):
        });
    return price;
}