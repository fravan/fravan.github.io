<script>
	import { Trash } from 'lucide-svelte';
	import IconButton from './IconButton.svelte';
	import Input from './Input.svelte';
	import Checkbox from './Checkbox.svelte';
	/** @type {{ product: Product, onDelete: (p: Product) => void }} */
	let { product = $bindable(), onDelete } = $props();
	/** @type any */
	let nameInputRef;

	$effect(() => {
		if (product.name === '') {
			nameInputRef.focus();
		}
	});
</script>

<tr>
	<td>
		<Input bind:value={product.name} bind:ref={nameInputRef} class="w-full" />
	</td>
	<td>
		<Checkbox bind:checked={product.kilo} class="mx-2" />
	</td>
	<td>
		<Input type="number" step="0.01" bind:value={product.price} class="w-full" />
	</td>
	<td class="w-6">
		<IconButton
			onclick={() => onDelete(product)}
			variant="outline"
			title={`Supprimer "${product.name}"`}
		>
			<Trash class="size-5" />
		</IconButton>
	</td>
</tr>
