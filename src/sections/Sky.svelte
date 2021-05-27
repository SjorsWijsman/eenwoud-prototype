<script>
import { gsap } from "gsap"
import { onMount } from "svelte"

onMount(() => {
	const clouds = document.querySelectorAll(".cloud")
	clouds.forEach(cloud => {
		const cloudAnimation = gsap.fromTo(cloud, 
			{
				x: "-30rem"
			}, 
			{
				duration: Math.random() * 100 + 50, 
				x: "100vw", 
				repeat: -1, 
				ease: "linear"
			}
		)
		cloudAnimation.progress(Math.random())
	})
})
</script>

<style>
.eenwoud-logo {
	position: fixed;
	top: 50vh;
	left: 50vw;
	transform: translateX(-50%) translateY(-50%);
	width: 28rem;
}

.pointer {
  --pointer-width: 3px;
  width: 0px;
  height: 20rem;
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
