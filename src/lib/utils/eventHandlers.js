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
 * @param {(event: KeyboardEvent) => void} cb
 */
export function withEnter(cb) {
	return function (/** @type {KeyboardEvent} */ e) {
		if (e.key === 'Enter') cb.call(this, e);
	};
}
