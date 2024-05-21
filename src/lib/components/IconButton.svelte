<script>
	import classNames from 'classnames';
	/** @type import('svelte/elements').HTMLButtonAttributes & { variant: 'primary' | 'outline' } */
	let { children, variant, class: className = '', ...props } = $props();
</script>

<button
	type="button"
	{...props}
	class={classNames(
		'rounded-full transition-colors p-1',
		'focus-visible:outline-none focus-visible:ring focus-visible:ring-accent-500',
		className,
		{
			'bg-accent-500 text-white active:bg-accent-700 hover:bg-accent-600': variant === 'primary',
			'text-accent-500 border border-accent-500 hover:bg-accent-50 active:bg-accent-100 hover:text-accent-600':
				variant === 'outline'
		}
	)}
>
	{@render children()}
</button>
