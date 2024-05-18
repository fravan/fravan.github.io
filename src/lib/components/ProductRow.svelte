<script>
	import { Check, Trash } from 'lucide-svelte';
	/** @type {{ product: Product, onDelete: (p: Product) => void }} */
	let { product, onDelete } = $props();
</script>

<tr>
	<td>{product.name}</td>
	<td>
		{#if product.kilo}
			<Check />
		{/if}
	</td>
	<td>{product.price.toLocaleString('fr-FR', { currency: 'EUR', style: 'currency' })}</td>
	<td>
		<Trash onclick={() => onDelete(product)} />
	</td>
</tr>
