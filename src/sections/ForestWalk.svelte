<script>
	import AudioPlayer from '../components/AudioPlayer.svelte'
	import TreeGenerator from '../components/TreeGenerator.svelte'

	import { stories, walk } from '$lib/store'

	fetch('resources/data/stories.json')
		.then((response) => response.json())
		.then((storiesData) => {
			stories.set(storiesData)
			generateWalk()
		})

	// Generate a new walk from selected themes
	function generateWalk() {
		console.log('creating new walk')
		let availableStories = [...$stories]
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
	<TreeGenerator />
	<AudioPlayer />
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
	}

	section :global(*) {
		color: white;
	}

	img {
		min-width: 100vw;
		min-height: 100vh;
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 0;
	}
</style>
