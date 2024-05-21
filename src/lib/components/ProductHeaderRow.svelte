<script>
	import { Plus } from 'lucide-svelte';
	import IconButton from './IconButton.svelte';

	let { onAddClick } = $props();
</script>

<tr>
	<th>Nom</th>
	<th>Prix au kilo</th>
	<th>Prix</th>
	<th>
		<IconButton onclick={onAddClick} variant="primary" title="Ajouter un nouveau produit">
			<Plus class="size-5" />
		</IconButton>
	</th>
</tr>
