<script>
	import DataRow from './DataRow.svelte'

	export let data
</script>

<section>
	{#each data as boom}
		<DataRow data={boom} />
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
	}
</style>
