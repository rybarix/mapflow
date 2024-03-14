import assert from 'node:assert';
import MapFlow from '../src/mapflow.js';

const inputArray = [1,2,3,4,5];
const mp = new MapFlow(inputArray);

let indexCounter = 0; // Testing that index is correctly supplied to callback
mp.alter((/**@type {number} n*/n, index) => {
	indexCounter += index;
	return n**2;
}).alter((/**@type {number} n*/n, index) => {
	indexCounter += index;
	return n**2;
});

const expected = inputArray.map((n) => n**4);
const actual = Array.from(mp.generator());
assert.deepEqual(actual, expected, 'Arrays don\'t match');
assert.equal(indexCounter, 20, 'Index argument emmiting incorrect values');
