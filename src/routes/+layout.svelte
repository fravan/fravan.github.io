<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="max-w-screen-lg mx-auto">
	<Header />

	<main>
		<slot />
	</main>
</div>
