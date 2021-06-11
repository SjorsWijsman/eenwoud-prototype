import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <body id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
		vite: {
			optimizeDeps: {
				include: 'sharp',
			},
		},
	},
}

export default config
