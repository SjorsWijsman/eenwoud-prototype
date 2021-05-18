<script>
import { onMount } from 'svelte'

onMount(async () => {
	const bgSounds = new Audio('./resources/sounds/nature-sounds.mp3');
	const audioBtn = document.querySelector('.play');
	audioBtn.addEventListener("click", (event)=> {
		if(! bgSounds.duration > 0 && !bgSounds.paused){
			bgSounds.play()
		}
	})
})
</script>

<style>
button {
  position: fixed;
  top: 10vh;
  right: 5vw;
  background: rgba(225,225,225,0.5);
  border: 2px solid #fff;
  border-radius: 100%;
  padding: 2rem 1.6rem;
  color: #fff;
}
</style>

<button>Play</button>	
<!-- svelte-ignore a11y-media-has-caption -->
<audio class="play" autoplay>
  <source src="./resources/sounds/nature-sounds.mp3">
</audio>