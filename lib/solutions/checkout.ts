'use strict';

import {items, offers, productExists, IProductMap, IOffer} from "./items";

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
    console.log(skus + "price:"+ price + " reductions:" + reductions + " total:" + total);
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
    const reduction = 0;
    offers.forEach((offer:IOffer) => {
        if (offer.products) {
            const offerProducts = offer.products;
            while (productContainProducts(products, offerProducts)) {
                deductProducts(products, offerProducts);
                reduction += calculatePriceOfAllProducts(offerProducts) - offer.price
            }
        }
        if (offer.productGroup) {

        }
    });
    return reduction;
}

function productContainsProductInGroup(products: IProductMap, productGroup: string[], quantity: number) {
    let numberOfProductsInGroup = 0;
    productGroup.forEach(sku => {
        if (products[sku]) {
            numberOfProductsInGroup += products[sku]
        }
    });
    return numberOfProductsInGroup > quantity;
}


function getProductGroupProducts(products: IProductMap, productGroup: string[], quantity: number) {
    let numberOfProductsStillRequired = quantity;
    let productGroupProducts = {};
    for ( let i = 0; i < productGroup.length; i++ ) {

        let sku = products
    }
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
