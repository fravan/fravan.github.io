<script>
	/** @type {{ product: Product }} */
	let { product } = $props();
</script>

<div class="p-2 rounded border">
	<p>{product.name}</p>
	<p>{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
</div>
