<script>
	import Input from '$lib/components/Input.svelte';
	/**
	 * @type {{
	 *  onProductSubmitted: (p: Product) => void,
	 * }}
	 */
	let { onProductSubmitted } = $props();

	let name = $state('');
	let price = $state(0);
	let kilo = $state(false);

	/** @param {SubmitEvent} event */
	function handleSubmit(event) {
		event.preventDefault();

		onProductSubmitted({ name, price, kilo });
		// @ts-ignore
		event.target?.reset();
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-2 items-start">
	<div class="flex items-center gap-2">
		<label for="name">Nom: </label>
		<Input type="text" bind:value={name} id="name" />
	</div>

	<div class="flex items-center gap-2">
		<label for="price">Prix: </label>
		<Input type="number" bind:value={price} id="price" step="0.01" />
	</div>

	<div class="flex items-center gap-2">
		<input type="checkbox" bind:checked={kilo} id="kilo" class="accent-accent-500" />
		<label for="kilo">Prix au kilo</label>
	</div>

	<button type="submit">Ajouter un produit</button>
</form>
