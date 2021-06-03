<script>
import { onMount } from 'svelte';
import ProgressBar from '../components/ProgressBar.svelte'
import { walk, play, audioIndex, progress } from '../store.js'

let audioElement
let duration
let currentTime

$: currentTime, setProgress()

onMount(() => {
  walk.subscribe(currentWalk => {
    play.set(false)
    $audioIndex = 0
    $progress = 0
    if (currentWalk.length > 0) {
      audioElement.src = `./resources/audio/stories/${currentWalk[$audioIndex].audioSrc}`
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
  audioElement.src = `./resources/audio/stories/${$walk[$audioIndex].audioSrc}`
  audioElement.play()
}

function setProgress() {
  if (audioElement) {
    progress.set(1 / duration * currentTime)
  }
}
</script>

<style>
button {
  background-color: transparent;
  border: none;
  height: 2rem;
  width: 2rem;
}
</style>

<!-- svelte-ignore a11y-media-has-caption -->
<audio bind:currentTime bind:duration bind:this={audioElement} preload="metadata" on:ended={nextAudio}></audio>
<ProgressBar>
  <button on:click={playPause}>
    {#if $play}
      <img src="./resources/icons/pause.svg" alt="Pause">
    {:else}
      <img src="./resources/icons/play.svg" alt="Play">
    {/if}
  </button>
</ProgressBar>


