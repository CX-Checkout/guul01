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