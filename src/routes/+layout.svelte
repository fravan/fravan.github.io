<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="max-w-screen-lg mx-auto h-lvh">
	<Header class="h-10" />

	<main class="px-2" style="height: calc(100lvh - 2.5rem)">
		<slot />
	</main>
</div>
