<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="max-w-screen-lg mx-auto h-full flex flex-col">
	<Header />

	<main class="px-2 grow">
		<slot />
	</main>
</div>
