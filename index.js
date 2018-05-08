var _ = require('lodash');

class City {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
	}
	
	clone () {
		return new City(this.id, this.x, this.y);
	}
}
class Route {
    constructor () {
        this.distance = 0;
        this.visitedCities = []
    }
    setDistance (value) {
        this.distance = value;
    }
    getDistance () {
        return this.distance;
    }
	traveledDistance () {
		let dist = 0;
		for (let i = 0; i + 1 < this.visitedCities.length; i++) {
			dist += countDist(this.visitedCities[i], this.visitedCities[i + 1]);
		}
		this.setDistance(dist);
	}
	clone () {
		let cloneRoute = new Route();
		cloneRoute.distance = this.distance;
		cloneRoute.visitedCities = this.visitedCities;
		return cloneRoute;
	}
}

let cities = [];
let countOfCities = 8;
let theBestSolution = new Route();
let route = new Route();


let countDist = (cityA, cityB) => { 
	return Math.floor(Math.sqrt(Math.pow(cityA.x - cityB.x, 2) + Math.pow(cityA.y - cityB.y, 2)));
};
const move = (arr, old_index, new_index) => {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}
const swap = (arr, i, j) => {
	let tArr = arr.slice(0);
	let temp = tArr[i];
	tArr[i] = tArr[j];
	tArr[j] = temp;
	return tArr;
}

const isBestRoute = (routeOne, routeTwo) => {
	if (routeTwo.visitedCities.length !== 0) {
		routeOne.traveledDistance();
		routeTwo.traveledDistance();
		return routeOne.distance < routeTwo.distance;
	}
}

const getRandomCity = (cities) => {
	let index = Math.floor(Math.random() * cities.length);
	let cityToReturn = cities[index];
	cities.splice(index, 1);
	return cityToReturn;
}
const BruteForce = (index, route, arrayOfCities) => {
	if(index !== countOfCities - 1) {
		for (let i = 0; i < arrayOfCities.length; i++) {
			arrayOfCities = swap(arrayOfCities, index, i);
			route.visitedCities = arrayOfCities.slice();
			let newRoute = route.clone();
			BruteForce(index + 1, newRoute, arrayOfCities);
			arrayOfCities = swap(arrayOfCities, index, i);
		}
	} else {
		if (isBestRoute(route, theBestSolution.clone())) {
			theBestSolution = route.clone();
		}
	}
}

const ClosestNeighbor = (index, arrayOfCities, currentCity) => {
	if (arrayOfCities.length === countOfCities) {
		theBestSolution.visitedCities.push(arrayOfCities.splice(0, 1)[0]);
	}
	if (arrayOfCities.length === 0) {
		return;
	}
	let dist = countDist(currentCity, arrayOfCities[0]);
	let iterator  = 0;
	_.forEach(arrayOfCities, (city, i) => {
		if (dist > countDist(currentCity, city)) {
			dist = countDist(currentCity, city);
			iterator = i;
		}
		if (i === arrayOfCities.length - 1) {
			theBestSolution.visitedCities.push(arrayOfCities.splice(iterator, 1)[0])
			ClosestNeighbor(0, arrayOfCities, theBestSolution.visitedCities[theBestSolution.visitedCities.length - 1]);
		}
	})
}

const InsertionHeuristics = (arrayOfCities) => {
	// init the Route
	let firstCity = getRandomCity(arrayOfCities);
	theBestSolution.visitedCities.push(firstCity);
	theBestSolution.visitedCities.push(getRandomCity(arrayOfCities));
	theBestSolution.visitedCities.push(firstCity);
	let theBestDistance;
	while (arrayOfCities.length) {
		let currentCity = getRandomCity(arrayOfCities);
		theBestSolution.visitedCities.push(currentCity)
		move(theBestSolution.visitedCities, theBestSolution.visitedCities.length - 1, theBestSolution.visitedCities.length - 2);
		theBestSolution.traveledDistance();
		theBestDistance = theBestSolution.getDistance();
		let tempRoute = new Route();
		tempRoute = theBestSolution.clone();
		for (let i = tempRoute.visitedCities.length - 2; i > 1; i--) {
			move(tempRoute.visitedCities, i, i - 1);
			tempRoute.traveledDistance();
			if (theBestDistance > tempRoute.getDistance()) {
				theBestSolution = tempRoute.clone();
			}
		}
	}
}

// Init the cities
for (let i = 0; i < countOfCities; i++) {
	cities.push(new City(i, Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)));
	theBestSolution.visitedCities.push(cities[i]);
}

timeBefore = new Date().getTime();
BruteForce(0, route.clone(), cities.slice());
theBestSolution.traveledDistance();
console.log('Najkrotszy dystans BruteForce: ' + theBestSolution.getDistance());
console.log('Czas Wykonania: ' + (new Date().getTime() - timeBefore) + ' ms');


timeBefore = new Date().getTime();
theBestSolution = new Route();
ClosestNeighbor(0, cities.slice(), cities[0]);
theBestSolution.traveledDistance();
console.log('Najkrotszy dystans ClosestNeighbor: ' + theBestSolution.getDistance());
console.log('Czas Wykonania: ' + (new Date().getTime() - timeBefore) + ' ms');

timeBefore = new Date().getTime();
theBestSolution = new Route();
InsertionHeuristics(cities.slice());
theBestSolution.visitedCities.splice(theBestSolution.visitedCities - 1, 1);
theBestSolution.traveledDistance();
console.log('Najkrotszy dystans InsertionHeuristics: ' + theBestSolution.getDistance());
console.log('Czas Wykonania: ' + (new Date().getTime() - timeBefore) + ' ms');