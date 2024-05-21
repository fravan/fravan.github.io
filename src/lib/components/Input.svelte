<script>
	let { class: className = '', ref = $bindable(), value = $bindable(), ...props } = $props();
</script>

<input
	{...props}
	bind:this={ref}
	class={`rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-accent-500 border border-slate-200 hover:border-slate-300 focus-visible:border-slate-500 px-2 py-0.5 ${className}`}
	bind:value
/>
