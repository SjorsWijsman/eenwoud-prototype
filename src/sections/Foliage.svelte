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

<img class="top" src="./resources/images/forest-edge.png" alt="We gaan dieper het bos in" />
<div>
	<img class="center" src="./resources/images/forest-edge-2.png" alt="We gaan dieper het bos in" />
	<img
		class="fill"
		src="./resources/images/foliage-background.png"
		alt="We gaan dieper het bos in"
	/>
</div>
<img class="bottom" src="./resources/images/bladerdek-1.png" alt="We gaan dieper het bos in" />

<style>
	div {
		position: relative;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		left: 0;
		background-color: red;
	}

	img {
		position: absolute;
		width: 100%;
		max-width: 100vw;
		overflow-x: hidden;
		background-color: transparent;
		object-fit: cover;
	}

	.top {
		z-index: 2;
		top: 0;
		transform: translateY(-50%);
	}

	.center {
		z-index: 3;
		top: 0;
	}

	.bottom {
		z-index: 4;
		top: 100%;
		transform: translateY(-50%);
	}

	.fill {
		z-index: 1;
		height: 100%;
	}
</style>
