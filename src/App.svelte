<script>
import Sky from './sections/Sky.svelte'
import Foliage from './sections/Foliage.svelte'
import Forest from './sections/Forest.svelte'
import ForestTransition from './sections/ForestTransition.svelte'
import ForestWalk from './sections/ForestWalk.svelte'

import AudioPlayer from './components/AudioPlayer.svelte'

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

import { onMount } from 'svelte'

let walk = false

onMount(() => {
	const tl = gsap.timeline({
		// Trigger 200px from top of Forest
		scrollTrigger: {
			trigger: "#forest",
			start: "top+=200px top",
      end: window.innerHeight * 4,
      scrub: true,
			// markers: {startColor: "white", endColor: "red", fontSize: "12px"},
		}
	})
	// Start transition to fill screen
	tl.to("#forestTransition", {
		x: "-100vmax", 
		duration: 1,
	})
	// Swap out Forest with ForestWalk
	tl.call(() => {
		walk = !walk
	})
	// Full transitioned
	tl.to("#forestTransition", {
		x: "-200vmax", 
		duration: 1,
	})
})
</script>

<style>
header {
	position: relative;
	background: radial-gradient(ellipse at bottom, var(--color-sky-light) -50%, var(--color-sky-dark) 150%);
	background-repeat: no-repeat;
	background-attachment: fixed;
	min-height: 100vh;
	z-index: 0;
}

main {
	position: relative;
}

main > * {
	position: relative;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	height: 100vh;
	z-index: 1;
}

#foliage {
	background-color: hsl(123, 55%, 23%);
	align-items: center;
	z-index: 3;
}

#forest {
	min-height: 300vh;
	background-color: hsl(34, 80%, 27%);
}

#forestWalk {
	min-height: 300vh;
	background-color: yellow;
}

#forestTransition {
	position: fixed;
	min-height: 100vh;
	min-width: 100vmax;
	left: 100vw;
	top: 0;
	background-color: hsl(124, 79%, 27%);
	z-index: 4;
}

</style>

<AudioPlayer/>	
<header>
	<Sky/>
</header>
<main>
	<section id="foliage">
		<Foliage/>
	</section>
	<section id="forestTransition">
		<ForestTransition/>
	</section>
	{#if !walk}
	<section id="forest">
		<Forest/>
	</section>
	{:else}
	<section id="forestWalk">
		<ForestWalk/>
	</section>
	{/if}
</main>