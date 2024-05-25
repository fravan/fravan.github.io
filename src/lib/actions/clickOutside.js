/**
 * @param {HTMLElement} node
 * @param {() => void} onClickOutside
 * */
export function clickOutside(node, onClickOutside) {
	/** @param {Event} event */
	function handleClick(event) {
		const path = event.composedPath();

		if (!path.includes(node)) {
			onClickOutside();
		}
	}

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}
