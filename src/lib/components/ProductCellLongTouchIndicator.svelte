<script>
	/** @type {{ timeout: number, onTimeout: () => void }} */
	let { timeout = 500, onTimeout } = $props();
	let progress = $state(0);

	$effect(() => {
		const interval = setInterval(() => {
			progress += 50 / timeout;
			if (progress > 1) {
				progress = 1;
				clearInterval(interval);
				onTimeout();
			}
		}, 50);

		return () => clearInterval(interval);
	});
</script>

<div
	class="row-start-1 col-start-1 col-span-full h-full bg-accent-600 transition-all duration-[50ms]"
	style="width: calc({progress}*100%)"
></div>
