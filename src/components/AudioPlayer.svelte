<script>
	import { onMount } from 'svelte'
	import ProgressBar from '../components/ProgressBar.svelte'
	import { walk, play, audioIndex, progress } from '$lib/store'

	let audioElement
	let duration
	let currentTime
	let currentWalk

	$: currentTime, setProgress()

	walk.subscribe((value) => {
		currentWalk = value
	})

	onMount(() => {
		walk.subscribe((currentWalk) => {
			play.set(false)
			$audioIndex = 0
			$progress = 0
			if (currentWalk.length > 0) {
				audioElement.src = currentWalk[$audioIndex].audioLink
			}
		})
	})

	function playPause() {
		play.set(!$play)
		$play ? audioElement.play() : audioElement.pause()
	}

	function nextAudio() {
		$audioIndex += 1
		$progress = 0
		if ($audioIndex >= currentWalk.length) {
			$audioIndex = 0
		}
		audioElement.src = currentWalk[$audioIndex].audioLink
		audioElement.play()
	}

	function setProgress() {
		if (audioElement) {
			progress.set((1 / duration) * currentTime)
		}
	}
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio
	bind:currentTime
	bind:duration
	bind:this={audioElement}
	preload="metadata"
	on:ended={nextAudio}
/>
<ProgressBar>
	<button on:click={playPause}>
		{#if $play}
			<img src="./resources/icons/pause.svg" alt="Pause" />
		{:else}
			<img src="./resources/icons/play.svg" alt="Play" />
		{/if}
	</button>
</ProgressBar>

<style>
	button {
		background-color: transparent;
		border: none;
		height: 2rem;
		width: 2rem;
		padding: 0;
	}

	button img {
		width: 2rem;
		height: 2rem;
	}
	button img {
		width: 2rem;
		height: 2rem;
	}
</style>
