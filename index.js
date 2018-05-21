var _ = require('lodash');

class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

const trainData = [
    new Point(3, 1.5, 'red'),
    new Point(2, 1, 'blue'),
    new Point(4, 1.5, 'red'),
    new Point(3, 1, 'blue'),
    new Point(3.5, 0.5, 'red'),
    new Point(2, 0.5, 'blue'),
    new Point(1, 1, 'red')
];

const testData = [
    new Point(4.5, 1, '')
];

const sigmoid = (value) => {
    let result = 1 / (1 + Math.pow(Math.E, -value));
    console.log(result);
    return result;
}

const randomNumber = () => Math.random();

const training = (point, w1, w2, b) => {
    return sigmoid(point.x * w1 + point.y + w2 + b);
}

const check = (value) => {
    if(value > 0.5) {
        console.log('blue');
    } else {
        console.log('red');
    }
}

let w1 = randomNumber();
let w2 = randomNumber();
let b = randomNumber();

_.forEach(trainData, (point) => check(training(point, w1, w2, b)));



