<script>
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

import { onMount } from "svelte"

let textElement = null

onMount(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: textElement,
      pin: true,
      scrub: true,
      start: "top bottom",
      end: "+=500",
    }
  })
  tl.to(textElement, {y: 100, duration: 1});
  tl.from(textElement, {y: -100, duration: 1});
})
</script>

<style>
p {
  color: white;
  position: absolute;
  z-index: 5;
  font-size: 2rem;
  max-width: 45rem;
  margin: 1rem;
}
</style>

<p bind:this={textElement}>
  <slot/>
</p>