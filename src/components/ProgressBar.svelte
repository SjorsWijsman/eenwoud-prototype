<script>
import { walk, progress, audioIndex } from '../store.js'
</script>

<style>
section {
  display: grid;
  grid-template-areas: 
            "titles    button"
            "progress button";
}

section div {
  display: flex;
  justify-content: space-around;
}

section div:nth-child(1) {
  grid-area: titles;
}

section div:nth-child(2) {
  grid-area: progress;
}

section :last-child {
  grid-area: button;
}

p {
  padding: 0.2rem 1rem;
  flex-grow: 1;
  max-width: 15rem;
  text-align: center;
}

meter {
  flex-grow: 1;
  margin: 0 1rem;
}
</style>

{#if $walk.length > 0}
<section>
  <div>
    {#each $walk as story}
      <p>{story.title}</p>
    {/each}
  </div>
  <div>
    {#each $walk as story, i}
      <meter id={story.title} value={$progress + $audioIndex} min={i} max={i+1}></meter>
    {/each}
  </div>

  <slot></slot>
</section>
{/if}