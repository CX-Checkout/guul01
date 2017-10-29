'use strict';

//noinspection JSUnusedLocalSymbols
export function checkout(skus: string[]) {
    if (!Array.isArray(skus)) {
        return -1;
    }

    for (let i = 0; i < skus.length; i++) {
        if (typeof skus[i] !== 'string') {
            return -1;
        }
    }
}

export function checkout(skus: string) {
    if (typeof skus !== 'string') {
        return -1;
    }
    const skuList = skus.split(',');
    let price = 0;
    let productsToBuy = {};
    skuList.forEach((sku) => {
        productsToBuy[sku] = productsToBuy[sku] ? productsToBuy[sku] + 1 :1
    });
}
