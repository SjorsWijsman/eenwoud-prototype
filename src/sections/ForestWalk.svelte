<script>
	import { fly } from 'svelte/transition'

	import AudioPlayer from '../components/AudioPlayer.svelte'
	import TreeGenerator from '../components/TreeGenerator.svelte'
	import { supabase } from '$lib/db'

	import { walk } from '$lib/store'

	let popup = false

	async function getData() {
		const { data, error } = await supabase.from('bomen').select()

		if (error) throw new Error(error.message)

		generateWalk(data)

		return data
	}

	// Generate a new walk from selected themes
	function generateWalk(data) {
		let availableStories = data.filter((tree) => tree.audioLink && tree.title)

		let newWalk = []

		const maxStoriesCount = 3

		// Limit story count to available stories
		let storyCount = maxStoriesCount
		if (maxStoriesCount > availableStories.length) {
			storyCount = availableStories.length
		}

		// Get random stories
		for (let i = 0; i < storyCount; i++) {
			let idx = Math.floor(Math.random() * availableStories.length)
			newWalk.push(availableStories[idx])
			availableStories.splice(idx, 1)
		}

		// Update walk store
		walk.set(newWalk)
	}
</script>

<section>
	{#await getData()}
		<div>
			<p>Audioverhalen worden opgehaald...</p>
		</div>
	{:then data}
		<TreeGenerator />
		<AudioPlayer bind:popup />
	{:catch error}
		<div>
			<p>Er is iets mis gegaan bij het ophalen van de data. Laad de pagina opnieuw:</p>
			<pre>{error}</pre>
		</div>
	{/await}
	{#if popup}
		<div transition:fly={{ y: -100, duration: 1000 }}>
			<p>Geinspireerd door de verhalen van anderen?</p>
			<a href="./boom-voordragen" target="_blank">Draag nu ook een boom voor bij Eenwoud!</a>
		</div>
	{/if}
</section>
<img src="../resources/images/forest-path2.webp" alt="" />

<style>
	section {
		position: sticky;
		top: 0;
		width: 100vw;
		height: 100vh;
		max-height: 100vh;
		max-width: 60rem;
		object-fit: cover;
		z-index: 1;
		overflow: hidden;
	}

	section :global(*) {
		color: white;
	}

	img {
		min-width: 100vw;
		min-height: 100vh;
		max-width: 100vw;
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 0;
	}

	div {
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translate(-50%, -50%);
		text-align: center;
	}
</style>
