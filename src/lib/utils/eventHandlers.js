/**
 * @param {(event: Event) => void} cb
 */
export function withPrevent(cb) {
	return (/** @type {Event} */ e) => {
		e.preventDefault();
		cb(e);
	};
}
