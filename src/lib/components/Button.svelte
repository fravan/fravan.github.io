<script>
	import classNames from 'classnames';
	/** @type import('svelte/elements').HTMLButtonAttributes & { variant: 'primary' | 'outline' | 'plain' } */
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
			'bg-accent-500 text-white enabled:active:bg-accent-700 enabled:hover:bg-accent-600 disabled:bg-accent-300':
				variant === 'primary',
			'border border-accent-500 text-accent-950 enabled:hover:border-accent-700 enabled:hover:bg-accent-50 enabled:active:bg-accent-100 enabled:active:border-accent-500 disabled:text-accent-300 disabled:border-accent-300':
				variant === 'outline',
			'text-accent-950 enabled:hover:text-accent-500 disabled:text-gray-400': variant === 'plain'
		}
	)}
>
	{#if children}
		{@render children()}
	{/if}
</button>
