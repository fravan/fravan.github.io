<script>
	import { tick } from 'svelte';
	import { withEnter } from '$lib/utils/eventHandlers';
	import Input from './Input.svelte';
	/** @type {{ 
    totalToPay: number, 
    onAbortCheckout: () => void,
    onCheckout: () => void,
  }} */
	let { totalToPay, onAbortCheckout, onCheckout } = $props();
	let paid = $state(0);
	let giveBack = $derived(totalToPay - paid);
	let input;

	$effect(async () => {
		await tick();
		input.focus();
	});
</script>

<div class="flex flex-col gap-1">
	<Input
		bind:ref={input}
		bind:value={paid}
		type="number"
		class="w-full"
		onblur={onAbortCheckout}
		onkeyup={withEnter(onCheckout)}
		placeholder="Total reçu"
		step="0.01"
		min="0"
	/>
	<p class="font-bold text-xl">
		<span>{giveBack < 0 ? 'Total à rendre : ' : 'Reste à payer : '}</span>
		<span>{giveBack.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
	</p>
</div>
