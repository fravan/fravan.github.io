<script>
	import classNames from 'classnames';
	/** @type import('svelte/elements').HTMLButtonAttributes & { variant: 'primary' | 'outline' } */
	let { children, variant, class: className = '', ...props } = $props();
</script>

<button
	type="button"
	{...props}
	class={classNames(
		'rounded transition-colors px-2 py-0.5',
		'focus-visible:outline-none focus-visible:ring focus-visible:ring-accent-500',
		className,
		{
			'bg-accent-500 text-white active:bg-accent-700 hover:bg-accent-600': variant === 'primary',
			'border border-accent-500 text-accent-950 hover:border-accent-700 hover:bg-accent-50 active:bg-accent-100 active:border-accent-500':
				variant === 'outline'
		}
	)}
>
	{#if children}
		{@render children()}
	{/if}
</button>
