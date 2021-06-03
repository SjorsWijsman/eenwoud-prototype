<script>
import { stories, selectedThemes } from '../store.js'

let themes

// Get list of themes from stories
stories.subscribe(storiesData => {
  storiesData = storiesData.map(story => story.theme)
  themes = storiesData.filter((theme, index) => {
    return storiesData.indexOf(theme) === index
  })
})
</script>

{#if themes}
{#each themes as theme}
  <input type=checkbox bind:group={$selectedThemes} id={theme} value={theme}>
  <label for={theme}>{theme}</label>
{/each}
{/if}