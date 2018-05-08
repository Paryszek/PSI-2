var _ = require('lodash');
// http://patrykkobielak.pl/java-sztuczny-neuron/
// http://patrykkobielak.pl/java-najprostsza-siec-neuronowa/
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const numberOfPoints = 10;
const sizeOfOX = 100;
const sizeOfOY = 100;

const randomNumber = (value) => Math.floor(Math.random() * value);
const functionOfActivation = (x, y) 

let tableOfPoints = [];
let tableOfValues = [];

let w1 = randomNumber(5);
let w2 = randomNumber(5);


for (let i = 0; i < numberOfPoints; i++) {
    tableOfPoints.push(new Point(randomNumber(sizeOfOX), randomNumber(sizeOfOY)));
}
console.log(tableOfPoints);

