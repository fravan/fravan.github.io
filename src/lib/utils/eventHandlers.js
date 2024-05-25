/**
 * @param {(event: Event) => void} cb
 */
export function withPrevent(cb) {
	return function (/** @type {Event} */ e) {
		e.preventDefault();
		cb.call(this, e);
	};
}

/**
 * @param {(event: Event) => void} cb
 */
export function withStopPropagation(cb) {
	return function (/** @type {Event} */ e) {
		e.stopPropagation();
		cb.call(this, e);
	};
}

/**
 * @param {(event: KeyboardEvent) => void} cb
 */
export function withEnter(cb) {
	return function (/** @type {KeyboardEvent} */ e) {
		if (e.key === 'Enter') cb.call(this, e);
	};
}

/**
 * @param {string} message
 * @param {(event: Event) => void} cb
 */
export function withLog(message, cb) {
	return function (/** @type {Event} */ e) {
		console.log(message, e);
		cb.call(this, e);
	};
}
