<script>
	import { onMount } from 'svelte'

	import { walk, stories, selectedThemes } from '../store.js'

	const maxStoriesCount = 3

	// Generate a new walk from selected themes
	function generateWalk() {
		let availableStories = [...$stories]
		let newWalk = []

		// If themes selected, filter out stories without that theme
		if ($selectedThemes.length > 0) {
			availableStories = availableStories.filter((story) => $selectedThemes.includes(story.theme))
		}

		// Max story count to available stories
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

{#if $selectedThemes.length > 0}
	<button on:click={generateWalk}>Start Wandeling</button>
{:else}
	<button on:click={generateWalk}>Random Wandeling</button>
{/if}

<style>
	button {
		background-color: transparent;
		border: 1px solid white;
		padding: 1rem;
	}
</style>
