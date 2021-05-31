<script>
import { gsap } from "gsap"
import { onMount } from "svelte"

onMount(() => {
	// Cloud animation
	const clouds = document.querySelectorAll(".cloud")
	clouds.forEach(cloud => {
		const distance = Math.random()
		const cloudAnimation = gsap.fromTo(cloud, {
			x: "-30rem",
			// Value between 20 - 40rem
			width: `${((1 - distance) * 2 + 2) * 10}rem`
		}, {
			duration: distance * 200 + 200, 
			x: "100vw", 
			repeat: -1, 
			ease: "linear"
		})
		cloudAnimation.progress(distance)
	})

	// Eenwoud Logo animation
	gsap.to(".cloud", {
		y: "+=2rem",
		scrollTrigger: {
			trigger: "#sky",
			start: "top top",
      end: window.innerHeight,
      scrub: true,
			// markers: {startColor: "white", endColor: "red", fontSize: "12px"},
		}
	})

	// Eenwoud Logo animation
	gsap.to([".eenwoud-logo", ".pointer"], {
		y: "-=10rem",
		scrollTrigger: {
			trigger: "#sky",
			start: "top top",
      end: window.innerHeight,
      scrub: true,
			// markers: {startColor: "white", endColor: "red", fontSize: "12px"},
		}
	})
})
</script>

<style>
.eenwoud-logo {
	position: fixed;
	top: 45%;
	left: 50%;
	transform: translateX(-50%);
	width: 90vw;
	max-width: 28rem;
}

.pointer {
  --pointer-width: 3px;
  width: 0px;
  height: 30rem;
  border-left: var(--pointer-width) solid white;
	position: fixed;
	top: 50vh;
	left: 50vw;
	transform: translate(calc(50% - var(--pointer-width)), 6rem);
}

.pointer::before {
	position: fixed;
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: var(--pointer-width) solid white;
  transform: translate(-0.5rem, calc(-0.5rem - var(--pointer-width)))
}

.cloud {
	position: fixed;
	width: 30rem;
}

.cloud:nth-of-type(1) {
	top: 60%;
}
.cloud:nth-of-type(2) {
	top: 10%;
}
.cloud:nth-of-type(3) {
	top: 25%;
}
</style>

<img class="eenwoud-logo" src="./resources/images/eenwoud-wit.png" alt="Eenwoud">
<div>
  <img class="cloud" src="./resources/images/cloud1.png" alt="Er hangt een blauwe lucht boven Eenwoud">
  <img class="cloud" src="./resources/images/cloud2.png" alt="De wolken komen langzaam langs">
  <img class="cloud" src="./resources/images/cloud3.png" alt="Er is onderaan een bladerdek te zien">	
</div>
<div class="pointer"></div>
