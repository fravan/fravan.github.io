<script>
	import ProductCell from '$lib/components/ProductCell.svelte';
	import { createProductsStore } from '$lib/stores/products.svelte.js';
	import { createOrdersStore } from '$lib/stores/orders.svelte.js';
	import Button from '$lib/components/Button.svelte';
	import MoreMenu from '$lib/components/MoreMenu.svelte';

	let productsStore = createProductsStore();
	let ordersStore = createOrdersStore();
	let returnMode = $state(false);
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
	<div class="grow overflow-y-auto -mr-2 pr-2">
		<section class="grid grid-cols-2 items-start gap-2">
			{#each productsStore.products as p}
				<ProductCell
					product={p}
					quantity={currentOrder[p.name].quantity}
					onQuantityChange={(q) => {
						if (isNaN(q) || typeof q !== 'number') {
							console.warn(`Received some strange quantity : ${q}`);
							return;
						}
						currentOrder[p.name].quantity = q;
					}}
				/>
			{/each}
		</section>
	</div>

	<section class="my-2 shrink-0 flex items-center gap-2">
		<MoreMenu
			price={totalPrice}
			onResetOrder={resetOrder}
			onToggleReturnMode={() => (returnMode = !returnMode)}
		/>
		<!-- <Button disabled={totalPrice === 0} variant="outline" onclick={resetOrder}>Annuler</Button> -->
		<Button disabled={totalPrice === 0} variant="primary" onclick={saveOrder} class="grow">
			{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
		</Button>
	</section>
</div>
