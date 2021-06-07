<script>
	import { stories, selectedThemes } from '$lib/store'

	let themes

	// Get list of themes from stories
	stories.subscribe((storiesData) => {
		storiesData = storiesData.map((story) => story.theme)
		themes = storiesData.filter((theme, index) => {
			return storiesData.indexOf(theme) === index
		})
	})
</script>

<form>
	{#if themes}
		{#each themes as theme}
			<input type="checkbox" bind:group={$selectedThemes} id={theme} value={theme} />
			<label for={theme}>{theme}</label>
		{/each}
	{/if}
</form>

<style>
	input {
		position: absolute;
		visibility: hidden;
		opacity: 0;
	}

	input + label {
		color: #ccc;
		font-style: italic;
		padding: 1rem;
		cursor: pointer;
	}

	input:checked + label {
		color: white;
		font-weight: bold;
		font-style: normal;
	}
</style>
