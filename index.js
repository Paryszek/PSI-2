var _ = require('lodash');

class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    getTarget() {
        switch (this.color) {
            case 'blue':
                return 0
            break;
            case 'red':
                return 1
            break;
        }
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

const testData = [new Point(4.5, 1, '')];

const sigmoid = (value) => 1 / (1 + Math.exp(-value));

const sigmoid_p = (value) => sigmoid(value) * (1-sigmoid(value));

const randomNumber = () => Math.random();

const training = (point, w1, w2, b) => sigmoid(point.x * w1 + point.y + w2 + b);

const LEARNING_RATE = 0.2;
const ITERATIONS = 50000;

let w1 = randomNumber();
let w2 = randomNumber();
let b = randomNumber();
// Training
for (var i = 0; i < ITERATIONS; i++) {
    let number = Math.floor((Math.random() * trainData.length));
    let point = trainData[number];
    let v = point.x * w1 + point.y * w2 + b;
    let pred = sigmoid(v);
    let t = point.getTarget();
    let cost = Math.pow(pred - t, 2);
    let dcost = 2 * (pred - t);
    let dpred = sigmoid_p(v);
    w1 = w1 - LEARNING_RATE * dcost * dpred * point.x;
    w2 = w2 - LEARNING_RATE * dcost * dpred * point.y;
    b = b - LEARNING_RATE * dcost * dpred * 1;
}
// Test
let unknownPoint = testData[0];
let v = unknownPoint.x * w1 + unknownPoint.y * w2 + b;
let _pred = sigmoid(v);
console.log(_pred);



