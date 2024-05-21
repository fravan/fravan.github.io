<script>
	let { class: className = '', checked = $bindable(), ...props } = $props();
</script>

<input
	{...props}
	class={`rounded cursor-pointer accent-accent-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-accent-500 ${className}`}
	type="checkbox"
	bind:checked
/>
