export function productExists(sku) {
    return typeof items[sku] !== 'undefined';
}

export var items = {
    "A": {price: 50},
    "B": {price: 30},
    "C": {price: 20},
    "D": {price: 15},
    "E": {price: 40},
    "F": {price: 10},
    "G": {price: 20},
    "H": {price: 10},
    "I": {price: 35},
    "J": {price: 60},
    "K": {price: 70},
    "L": {price: 90},
    "M": {price: 15},
    "N": {price: 40},
    "O": {price: 10},
    "P": {price: 50},
    "Q": {price: 30},
    "R": {price: 50},
    "S": {price: 20},
    "T": {price: 20},
    "U": {price: 40},
    "V": {price: 50},
    "W": {price: 20},
    "X": {price: 17},
    "Y": {price: 20},
    "Z": {price: 21},
};

export var offers: IOffer[] = [
    {
        products: {'A': 5},
        price: 200,
    },
    {
        products: {'A': 3},
        price: 130,
    },
    {
        products: {'E': 2, 'B': 1},
        price: items['E'].price * 2
    },
    {
        products: {'B': 2},
        price: 45,
    },
    {
        products: {'F': 3},
        price: items['F'].price * 2
    },
    {
        products: {'H': 10},
        price: 80,
    },
    {
        products: {'H': 5},
        price: 45,
    },
    {
        products: {'K': 2},
        price: 120,
    },
    {
        products: {'N': 3, 'M': 1},
        price: items['N'].price * 3,
    },
    {
        products: {'P': 5},
        price: 200,
    },
    {
        products: {'R': 3, 'Q': 1},
        price: items['R'].price * 3,
    },
    {
        products: {'Q': 3},
        price: 80,
    },
    {
        products: {'U': 4},
        price: items['U'].price * 3,
    },
    {
        products: {'V': 3},
        price: 130,
    },
    {
        products: {'V': 2},
        price: 90,
    },
    {
        productGroup: ['S', 'T', 'X', 'Y', 'Z'],
        quantity: 3,
        price: 45
    }
];

export interface IOffer {
    price: number;
    products?: IProductMap,
    quantity?: number,
    productGroup?: string[]
}


export interface IProductMap {[key:string]: number}
