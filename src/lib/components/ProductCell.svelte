<script>
	import { tick } from 'svelte';
	import Input from '$lib/components/Input.svelte';
	import { withPrevent, withEnter } from '$lib/utils/eventHandlers';

	/** @type {{ product: Product, quantity: number, onQuantityChange: (q: number) => void  }} */
	let { product, quantity, onQuantityChange } = $props();
	/** @type {number | undefined} */
	let clickingInterval = $state(undefined);
	let startedAt = $state(0);
	let clickingProgress = $state(0);
	/** @type HTMLInputElement */
	let inputRef;
	// Used for products that have a "per kilo" price
	let prompting = $state(false);

	function startClick() {
		if (clickingInterval != null) return;
		if (prompting) return;

		console.log('startClick');

		startedAt = Date.now();
		clickingProgress = 0;
		clickingInterval = setInterval(() => {
			clickingProgress = (Date.now() - startedAt) / 500;
			if (clickingProgress > 1) endClick();
		}, 50);
	}

	async function endClick() {
		if (clickingInterval == null) return;

		console.log('endClick');
		if (clickingProgress > 1) {
			onQuantityChange(0);
		} else if (product.kilo) {
			prompting = true;
			await tick();
			inputRef.focus();
		} else {
			onQuantityChange(quantity + 1);
		}
		abortClick();
	}

	function abortClick() {
		console.log('abortClick');
		clearInterval(clickingInterval);
		clickingInterval = undefined;
		clickingProgress = 0;
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
	onmousedown={startClick}
	onmouseup={endClick}
	onmouseleave={abortClick}
>
	<div
		class="row-start-1 col-start-1 col-span-full h-full bg-accent-600 transition-all duration-[50ms]"
		style="width: calc({clickingProgress}*100%)"
	></div>
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
		class:text-white={clickingProgress > 0}
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
