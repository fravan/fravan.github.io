<script>
	import { withStopPropagation } from '$lib/utils/eventHandlers';
	import { clickOutside } from '$lib/actions/clickOutside';
	import { Ellipsis } from 'lucide-svelte';
	import IconButton from './IconButton.svelte';
	import Button from './Button.svelte';

	/** @type {{ price: number, onResetOrder: () => void, onToggleReturnMode: () => void }} */
	let { price, onResetOrder, onToggleReturnMode } = $props();
	let open = $state(false);
</script>

<div class="relative">
	<IconButton onclick={withStopPropagation(() => (open = !open))} variant="outline">
		<Ellipsis class="size-5" />
	</IconButton>
	<dialog
		inert={!open}
		class:hidden={!open}
		class="absolute left-0 bottom-full w-max p-2 mb-2 rounded bg-white flex flex-col gap-2"
		use:clickOutside={() => (open = false)}
		onclick={() => (open = false)}
	>
		<Button variant="plain" onclick={onToggleReturnMode}>Activer/Désactiver le mode retour</Button>
		<Button variant="plain" onclick={onResetOrder} disabled={price == 0}>Annuler</Button>
	</dialog>
</div>
