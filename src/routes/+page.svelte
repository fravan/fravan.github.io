<script>
	import ProductCell from '$lib/components/ProductCell.svelte';
	import { createProductsStore } from '$lib/stores/products.svelte.js';
	import { createOrdersStore } from '$lib/stores/orders.svelte.js';
	import Button from '$lib/components/Button.svelte';
	import MoreMenu from '$lib/components/MoreMenu.svelte';
	import Checkout from '$lib/components/Checkout.svelte';

	let productsStore = createProductsStore();
	let ordersStore = createOrdersStore();
	let returnMode = $state(false);
	let showCheckout = $state(false);
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

<div class="h-full max-h-full flex flex-col gap-2">
	{#if returnMode}
		<div class="px-2 py-1 text-center text-sm bg-red-200 text-red-800">Mode retour activé</div>
	{/if}

	<div class="grow overflow-y-auto -mr-2 pr-2">
		<section class="grid grid-cols-2 items-start gap-2">
			{#each productsStore.products as p}
				<ProductCell
					product={p}
					quantity={currentOrder[p.name].quantity}
					onQuantityChange={(action) => {
						if (action.type === 'increment') {
							currentOrder[p.name].quantity += returnMode ? -1 : 1;
						} else {
							const amount = action.amount;
							if (isNaN(amount) || typeof amount !== 'number') {
								console.warn(`Received some strange quantity : ${amount}`);
								return;
							}
							currentOrder[p.name].quantity = returnMode ? -amount : amount;
						}
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
		<Button
			disabled={totalPrice === 0}
			variant="primary"
			onclick={() => (showCheckout = true)}
			class="grow"
		>
			{totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
		</Button>
	</section>

	{#if showCheckout}
		<Checkout
			totalToPay={totalPrice}
			onAbortCheckout={() => (showCheckout = false)}
			onCheckout={() => {
				saveOrder();
				showCheckout = false;
			}}
		/>
	{/if}
</div>
