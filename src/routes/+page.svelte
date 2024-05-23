<script>
	import ProductCell from '$lib/components/ProductCell.svelte';
	import { createProductsStore } from '$lib/stores/products.svelte.js';
	import { createOrdersStore } from '$lib/stores/orders.svelte.js';
	import Button from '$lib/components/Button.svelte';

	let productsStore = createProductsStore();
	let ordersStore = createOrdersStore();
	/** @type Order */
	let currentOrder = $state(
		productsStore.products.reduce(
			(acc, curr) => ({ ...acc, [curr.name]: { quantity: 0, price: 0 } }),
			{}
		)
	);
	let totalPrice = $derived.by(() => {
		return Object.values(currentOrder).reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
	});

	function saveOrder() {
		ordersStore.saveOrder(currentOrder);
		currentOrder = {};
	}
</script>

<svelte:head>
	<title>La caisse enregistreuse</title>
	<meta name="description" content="La Caisse Enregistreuse" />
</svelte:head>

<section class="flex flex-col gap-2">
	{#each productsStore.products as p}
		<ProductCell product={p} bind:order={currentOrder[p.name]} />
	{/each}
</section>

<section>
	<Button disabled={totalPrice === 0} variant="primary" onclick={saveOrder}>
		{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
	</Button>
</section>
