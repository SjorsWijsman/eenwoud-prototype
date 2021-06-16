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
<img src="./resources/images/leaves.png" alt="We gaan dieper het bos in" />

<style>
	img {
		position: absolute;
		width: 100%;
		max-width: 100vw;
		overflow-x: hidden;
		background-color: transparent;
		object-fit: cover;
	}

	img:nth-child(1) {
		z-index: 5;
		top: 0;
		transform: translateY(-50%);
	}

	img:nth-child(2) {
		z-index: 4;
		height: 100%;
		top: 5rem;
	}
</style>
