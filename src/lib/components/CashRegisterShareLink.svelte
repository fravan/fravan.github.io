<script>
	import QRCode from 'qrcode';

	/** @type {{ encodedProducts: string }} */
	let { encodedProducts } = $props();

	$effect(() => {
		const canvas = document.getElementById('cash-share-link');
		const url = import.meta.env.PROD ? window.location.origin : 'http://192.168.1.10:5173';
		QRCode.toCanvas(canvas, `${url}?c=${encodedProducts}`, function (error) {
			console.error('Got an error while generating QR code', error);
		});
	});
</script>

<canvas id="cash-share-link"></canvas>
