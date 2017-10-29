
export function productExists(sku) {
    return typeof items[sku] !== 'undefined';
}

export var items = {
    "A": {
        price: 50
    },
    "B": {
        price: 30
    },
    "C": {
        price: 20
    },
    "D": {
        price: 15
    },
    "E": {
        price: 40
    },
    "F": {
        price: 10
    }
};

export var offers = [
    {
        products: ['A', 'A', 'A', 'A', 'A'],
        price: 200,
    },
    {
        products: ['A', 'A', 'A'],
        price: 130,
    },
    {
        products: ['E', 'E', 'B'],
        price: items['E'].price * 2
    },
    {
        products: ['B', 'B'],
        price: 45,
    },
    {
        products: ['F', 'F', 'F'],
        price: items['F'].price * 2
    }
];