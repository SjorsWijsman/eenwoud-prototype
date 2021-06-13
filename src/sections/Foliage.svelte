<script>
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
	gsap.registerPlugin(ScrollTrigger)

	import { onMount } from 'svelte'

	onMount(() => {
		const tl = gsap.timeline({
			// Trigger 200px from top of Forest
			scrollTrigger: {
				trigger: '#sky',
				start: `top top`,
				end: `+=${window.innerHeight * 2}`,
				scrub: true,
				// markers: {startColor: "white", endColor: "red", fontSize: "12px"},
			},
		})
	})
</script>

<img src="./resources/images/forest-edge.webp" alt="We gaan dieper het bos in" />

<style>
	img {
		position: absolute;
		width: 100vw;
		overflow-x: hidden;
		background-color: transparent;
		object-fit: cover;
	}

	img:nth-child(1) {
		top: -20vh;
	}

	img:nth-child(2) {
		top: 0;
	}
</style>
