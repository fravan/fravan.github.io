<script>
	import QRCode from 'qrcode';

	/** @type {{ encodedProducts: string }} */
	let { encodedProducts } = $props();

	$effect(() => {
		const canvas = document.getElementById('cash-share-link');
		QRCode.toCanvas(
			canvas,
			`http://192.168.1.10:5173/setup?c=${encodedProducts}`,
			function (error) {
				console.log('After QR code stuff, error is :', error);
			}
		);
	});
</script>

<canvas id="cash-share-link"></canvas>
