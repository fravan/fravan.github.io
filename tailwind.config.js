/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brand: {
					50: '#f3f7f8',
					100: '#e1e9ec',
					200: '#c6d5db',
					300: '#9eb7c2',
					400: '#6f90a1',
					500: '#547586',
					600: '#445c6b',
					700: '#3f525f',
					800: '#394651',
					900: '#333d46',
					950: '#1f262d'
				},
				accent: {
					50: '#f0fdf5',
					100: '#dcfce8',
					200: '#bbf7d3',
					300: '#87eeb0',
					400: '#46dc83',
					500: '#23c465',
					600: '#17a250',
					700: '#167f41',
					800: '#176437',
					900: '#145330',
					950: '#052e18'
				}
			}
		}
	},
	plugins: []
};
