<script>
	import ThemeButtons from '../components/ThemeButtons.svelte'
	import GenerateWalk from '../components/GenerateWalk.svelte'
	import AudioPlayer from '../components/AudioPlayer.svelte'
	import TreeGenerator from '../components/TreeGenerator.svelte'

	import { stories } from '$lib/store'

	fetch('resources/data/stories.json')
		.then((response) => response.json())
		.then((storiesData) => {
			stories.set(storiesData)
		})
</script>

<section>
	<div>
		<ThemeButtons />
		<GenerateWalk />
	</div>
	<TreeGenerator />
	<AudioPlayer />
</section>

<style>
	section {
		position: sticky;
		top: 0;
		width: 100vw;
		min-height: 100vh;
		max-width: 60rem;
		object-fit: cover;
	}

	section :global(*) {
		color: white;
	}

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}
</style>
