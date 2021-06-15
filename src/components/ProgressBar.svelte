<script>
	import { walk, progress, audioIndex } from '$lib/store'
</script>

{#if $walk.length > 0}
	<section>
		<div style="grid-template-columns: repeat(1fr, {$walk.length});">
			{#each $walk as story}
				<p>{story.title}</p>
			{/each}
		</div>
		<div style="grid-template-columns: repeat(1fr, {$walk.length});">
			{#each $walk as story, i}
				<!-- svelte-ignore component-name-lowercase -->
				<progress id={story.title} value={-i + $progress + $audioIndex} max={1} />
			{/each}
		</div>

		<slot />
	</section>
{/if}

<style>
	section {
		position: absolute;
		bottom: 0;
		display: grid;
		grid-template-areas:
			'titles    button'
			'progress  button';
		grid-template-columns: 1fr 4rem;
		width: 100%;
		padding: 2rem 2rem;
	}

	section div {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: space-around;
	}

	section div:nth-child(1) {
		grid-area: titles;
	}

	section div:nth-child(2) {
		grid-area: progress;
	}

	section :global(button) {
		grid-area: button;
		place-items: center;
		margin-left: 1rem;
	}

	p {
		padding: 0.5rem;
		padding-top: 0;
		text-align: center;
		color: white;
	}

	progress {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		border: 0;
	}

	progress::-webkit-progress-bar {
		background-color: rgba(255, 255, 255, 0.3);
		height: 0.5rem;
		border-radius: 1rem;
	}

	progress::-webkit-progress-value {
		background-color: white;
		border-radius: 1rem;
	}
</style>
