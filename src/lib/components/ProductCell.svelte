<script>
	import { tick } from 'svelte';
	import Input from '$lib/components/Input.svelte';
	import { withEnter } from '$lib/utils/eventHandlers';
	import ProductCellLongTouchIndicator from './ProductCellLongTouchIndicator.svelte';

	/** @type {{ product: Product, quantity: number, onQuantityChange: (q: number) => void  }} */
	let { product, quantity, onQuantityChange } = $props();
	let touchStartTime = $state(0);
	let touchEndTime = $state(0);
	/** @type HTMLInputElement */
	let inputRef;
	// Used for products that have a "per kilo" price
	let prompting = $state(false);

	const longPressTimeout = 300;

	function startClick() {
		touchStartTime = Date.now();
	}

	async function endClick() {
		if (touchStartTime === 0) return;
		touchEndTime = Date.now();
		const touchDuration = touchEndTime - touchStartTime;

		if (touchDuration < longPressTimeout) {
			await handleMouseClick();
		} else {
			onQuantityChange(0);
		}
	}

	function abortClick() {
		touchStartTime = 0;
		touchEndTime = 0;
	}

	async function handleMouseClick() {
		// Handler is fired after touch events, so we can reset and ignore here
		if (touchStartTime !== 0) {
			abortClick();
			return;
		}
		if (product.kilo) {
			prompting = true;
			await tick();
			inputRef.focus();
		} else {
			onQuantityChange(quantity + 1);
		}
	}

	function endPrompt() {
		if (!prompting) return;
		prompting = false;
	}
</script>

<button
	type="button"
	class="bg-white text-sm border rounded hover:bg-accent-100 grid p-0"
	class:border-accent-600={quantity > 0}
	class:border-red-600={quantity < 0}
	style="grid-template-columns: max-content 1fr;"
	ontouchstart={startClick}
	ontouchend={endClick}
	ontouchcancel={abortClick}
	ontouchmove={abortClick}
	onclick={handleMouseClick}
>
	{#if touchStartTime !== 0}
		<ProductCellLongTouchIndicator
			timeout={longPressTimeout}
			onTimeout={() => {
				endClick();
				abortClick();
			}}
		/>
	{/if}
	<div
		class="px-2 py-1 h-full items-center justify-center text-white row-start-1 col-start-1"
		class:bg-accent-600={quantity > 0}
		class:bg-red-600={quantity < 0}
		class:hidden={quantity === 0}
		class:flex={quantity !== 0}
	>
		{quantity}
	</div>
	<div
		class="grow text-left px-2 py-1 row-start-1 col-start-2 transition-colors duration-200"
		class:text-white={touchStartTime > 0}
	>
		<p>{product.name}</p>
		<p class="text-xs">
			{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
		</p>
	</div>

	{#if product.kilo}
		<div class="row-start-1 col-start-1 col-span-full px-2 py-1" class:hidden={!prompting}>
			<Input
				type="number"
				step="0.001"
				class="w-full h-full"
				value={quantity}
				bind:ref={inputRef}
				onchange={(/** @type Event & { target: HTMLInputElement } */ e) =>
					onQuantityChange(Number(e.target.value))}
				onblur={endPrompt}
				onkeyup={withEnter(endPrompt)}
			/>
		</div>
	{/if}
</button>
