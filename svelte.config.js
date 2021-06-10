import vercel from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <body id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
	},
}

export default config
