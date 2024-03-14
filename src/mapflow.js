export default class MapFlow {
	/**
	 * @type {Array<any>}
	 */
	#arr;

	/**
	 * @type {Array<Generator<any, void, unknown>>}
	 */
	#sources;

	/**
	 * @param {Array<any>} array
	 */
	constructor(array) {
		this.#arr = array
		// Generator array. Order matters.
		this.#sources = [ MapFlow.#arrayToGenerator(this.#arr) ] // arr will be source we're starting from
	}

	/**
	 * Creates generator from an array.
	 * @param {Array<any>} array
 	 */
	static *#arrayToGenerator(array) {
		for (const x of array) {
			yield x
		}
	}

	/**
	 * Alters current item that is being yield.
	 * @template T
	 * @param {(item: T, index: number) => void} callback
	 */
	alter(callback) {
		const gen = function*(sourceGen) {
			let index = 0;
			for (const item of sourceGen) {
				yield callback(item, index++);
			}
		}

		// We initialized new generator `gen` by calling `gen()`.
		// We want to source this generator with data from previously
		// appended generators. Each generator is working with data
		// yielded from previous one.
		const generator = gen(this.#sources[this.#sources.length - 1]);
		this.#sources.push(generator);
		return this;
	}

	/**
	 * Returning latest generator that we can iterate upon.
	 * @returns {Generator<any, void, unknown>}
	 */
	generator() {
		return this.#sources[this.#sources.length - 1]
	}
}
