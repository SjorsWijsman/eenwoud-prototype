<script>
	import Sky from '../sections/Sky.svelte'
	import Foliage from '../sections/Foliage.svelte'
	import Forest from '../sections/Forest.svelte'
	import ForestTransition from '../sections/ForestTransition.svelte'
	import ForestWalk from '../sections/ForestWalk.svelte'

	import TextLayer from '../components/TextLayer.svelte'

	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
	gsap.registerPlugin(ScrollTrigger)
	gsap.core.globals('ScrollTrigger', ScrollTrigger)

	import { onMount } from 'svelte'

	let walk = false

	onMount(() => {
		const tl = gsap.timeline({
			// Trigger 200px from top of Forest
			scrollTrigger: {
				trigger: '#forest',
				start: `top+=${window.innerHeight / 2} top`,
				end: `+=${window.innerHeight * 2}`,
				scrub: true,
				ease: 'linear',
				// markers: {startColor: "white", endColor: "red", fontSize: "12px"},
			},
		})
		// Start transition to fill screen
		tl.to('#forestTransition', {
			x: '-120vw',
			duration: 1,
		})
		// Swap out ForestWalk with Forest
		tl.call(() => {
			walk = false
		})
		// Swap out Forest with ForestWalk
		tl.call(() => {
			walk = true
		})
		// Full transitioned
		tl.to('#forestTransition', {
			x: '-220vw',
			duration: 1,
		})
	})
</script>

<svelte:head>
	<title>Eenwoud</title>
</svelte:head>

<header>
	<Sky />
</header>
<main>
	<slot />
	<TextLayer />

	<section id="foliage">
		<Foliage />
	</section>

	<section id="forestTransition">
		<ForestTransition />
	</section>

	<section id="forest" class:hidden={walk}>
		<Forest />
	</section>
	<section id="forestWalk" class:hidden={!walk}>
		<ForestWalk />
	</section>
</main>
<footer>
	Eenwoud is een project van Lobke Meekes. Lees&nbsp; <a
		href="https://www.lobkemeekes.nl/eenwoud/"
		target="_blank">hier</a
	> &nbsp;meer over Eenwoud.
</footer>

<style>
	header {
		position: fixed;
		background: radial-gradient(
			ellipse at bottom,
			var(--color-sky-light) -50%,
			var(--color-sky-dark) 150%
		);
		background-repeat: no-repeat;
		background-attachment: fixed;
		min-height: 100vh;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 0;
	}

	.hidden {
		display: none;
	}

	main {
		padding-top: 100vh;
		position: relative;
	}

	main > * {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		height: 100vh;
		z-index: 1;
		/* background-color: rgba(0, 0, 0, 0); */
	}

	#foliage {
		align-items: center;
		z-index: 2;
		/* background-color: hsl(124, 63%, 34%); */
	}

	#forest {
		min-height: 500vh;
		/* background-color: hsl(34, 80%, 27%); */
	}

	#forestWalk {
		min-height: 500vh;
		background-color: black;
		flex-direction: column;
		align-items: center;
	}

	#forestTransition {
		position: fixed;
		min-height: 100vh;
		min-width: 100vmax;
		left: 100vw;
		top: 0;
		/* background-color: hsl(124, 79%, 27%); */
		z-index: 4;
	}

	footer {
		position: relative;
		padding: 1rem;
		width: 100%;
		display: flex;
		z-index: 1000;
		color: white;
		max-width: 58rem;
		margin: 0 auto;
	}
</style>
