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
			(acc, curr) => ({ ...acc, [curr.name]: { quantity: 0, price: curr.price } }),
			{}
		)
	);
	let totalPrice = $derived.by(() => {
		return Object.values(currentOrder).reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
	});

	function saveOrder() {
		ordersStore.saveOrder(currentOrder);
		resetOrder();
	}

	function resetOrder() {
		currentOrder = productsStore.products.reduce(
			(acc, curr) => ({ ...acc, [curr.name]: { quantity: 0, price: curr.price } }),
			{}
		);
	}
</script>

<svelte:head>
	<title>La caisse enregistreuse</title>
	<meta name="description" content="La Caisse Enregistreuse" />
</svelte:head>

<div class="h-full max-h-full flex flex-col">
	<section class="flex flex-col gap-2 grow overflow-y-auto -mr-2 pr-2">
		{#each productsStore.products as p}
			<ProductCell
				product={p}
				quantity={currentOrder[p.name].quantity}
				onQuantityChange={(q) => {
					currentOrder[p.name].quantity = q;
				}}
			/>
		{/each}
	</section>

	<section class="my-2 shrink-0 flex items-center gap-2">
		<Button disabled={totalPrice === 0} variant="outline" onclick={resetOrder}>Annuler</Button>
		<Button disabled={totalPrice === 0} variant="primary" onclick={saveOrder} class="grow">
			{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
		</Button>
	</section>
</div>
