# Mapflow

Lazy evaluation of JavaScript data transformation with a similar API to chaining the map function.


An alternative to calling multiple .map() calls on large arrays and waiting until the entire operation is processed.

:warning: No support for async generators right now.

**Example**

```js
const mp = new MapFlow([1,2,3,4,5]); // very large array
mp.alter((num, index) => {
	return num**2;
}).alter((num) => num**2);

// Using iterables:
for (const n of mp.generator()) {
	// n
}

// or manually using next():
const g = mp.generator();
const n = g.next().value; // get single value
```

## Development

Run tests using `npm test`
