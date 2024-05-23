<script>
	import { withPrevent } from '$lib/utils/eventHandlers';

	/** @type {{ product: Product, order: ProductOrder }} */
	let { product, order = $bindable() } = $props();
	/** @type {number | undefined} */
	let clickingInterval = $state(undefined);
	let startedAt = $state(0);
	let clickingProgress = $state(0);

	function startClick() {
		if (clickingInterval != null) return;

		startedAt = Date.now();
		clickingProgress = 0;
		clickingInterval = setInterval(() => {
			clickingProgress = (Date.now() - startedAt) / 500;
			if (clickingProgress > 1) endClick();
		}, 50);
	}

	function endClick() {
		if (clickingInterval == null) return;
		if (clickingProgress > 1) order.quantity = 0;
		else {
			order.quantity++;
		}
		// dispatch product update
		abortClick();
	}
	function abortClick() {
		clearInterval(clickingInterval);
		clickingInterval = undefined;
		clickingProgress = 0;
	}
</script>

<button
	type="button"
	class="bg-white text-sm border rounded hover:bg-brand-200 grid p-0"
	class:border-brand-600={order.quantity > 0}
	class:border-red-600={order.quantity < 0}
	style="grid-template-columns: max-content 1fr;"
	ontouchstart={withPrevent(startClick)}
	ontouchend={endClick}
	ontouchcancel={abortClick}
	onmousedown={startClick}
	onmouseup={endClick}
	onmouseleave={abortClick}
>
	<div
		class="row-start-1 col-start-1 col-span-full h-full bg-brand-600 transition-all duration-[50ms]"
		style="width: calc({clickingProgress}*100%)"
	></div>
	<div
		class="px-2 py-1 items-center justify-center text-white row-start-1 col-start-1"
		class:bg-brand-600={order.quantity > 0}
		class:bg-red-600={order.quantity < 0}
		class:hidden={order.quantity === 0}
		class:flex={order.quantity !== 0}
	>
		{order.quantity}
	</div>
	<div
		class="grow text-left px-2 py-1 row-start-1 col-start-2 transition-colors duration-200"
		class:text-white={clickingProgress > 0}
	>
		<p>{product.name}</p>
		<p class="text-xs">
			{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
		</p>
	</div>
</button>
