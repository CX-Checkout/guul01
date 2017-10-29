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
    "K": {price: 80},
    "L": {price: 90},
    "M": {price: 15},
    "N": {price: 40},
    "O": {price: 10},
    "P": {price: 50},
    "Q": {price: 30},
    "R": {price: 50},
    "S": {price: 30},
    "T": {price: 20},
    "U": {price: 40},
    "V": {price: 50},
    "W": {price: 20},
    "X": {price: 90},
    "Y": {price: 10},
    "Z": {price: 50},
};

/**
 *
 *
 | A    | 50    | 3A for 130, 5A for 200 |
 | B    | 30    | 2B for 45              |
 | C    | 20    |                        |
 | D    | 15    |                        |
 | E    | 40    | 2E get one B free      |
 | F    | 10    | 2F get one F free      |
 | G    | 20    |                        |
 | H    | 10    | 5H for 45, 10H for 80  |
 | I    | 35    |                        |
 | J    | 60    |                        |
 | K    | 80    | 2K for 150             |
 | L    | 90    |                        |
 | M    | 15    |                        |
 | N    | 40    | 3N get one M free      |
 | O    | 10    |                        |
 | P    | 50    | 5P for 200             |
 | Q    | 30    | 3Q for 80              |
 | R    | 50    | 3R get one Q free      |
 | S    | 30    |                        |
 | T    | 20    |                        |
 | U    | 40    | 3U get one U free      |
 | V    | 50    | 2V for 90, 3V for 130  |
 | W    | 20    |                        |
 | X    | 90    |                        |
 | Y    | 10    |                        |
 | Z    | 50    |                        |

 * @type {[{products: [string , string , string , string , string]; price: number} , {products: [string , string , string]; price: number} , {products: [string , string , string]; price: number} , {products: [string , string]; price: number} , {products: [string , string , string]; price: number}]}
 */
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
    },
    {
        products: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
        price: 80,
    },
    {
        products: ['H', 'H', 'H', 'H', 'H'],
        price: 45,
    },
    {
        products: ['K', 'K'],
        price: 150,
    },
    {
        products: ['N', 'N', 'N', 'M'],
        price: items['N'].price * 3,
    },
    {
        products: ['P', 'P', 'P', 'P', 'P'],
        price: 200,
    },
    {
        products: ['R', 'R', 'R', 'Q'],
        price: items['R'].price * 3,
    },
    {
        products: ['Q', 'Q', 'Q'],
        price: 80,
    },
    {
        products: ['U', 'U', 'U', 'U'],
        price: items['U'].price * 3,
    },
    {
        products: ['V', 'V', 'V'],
        price: 130,
    },
    {
        products: ['V', 'V'],
        price: 90,
    },
];