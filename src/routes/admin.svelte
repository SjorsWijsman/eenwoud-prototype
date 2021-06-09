<script>
	import DataTable from '../components/DataTable.svelte'

	let submit

	function getData() {
		submit = fetch('/api/getTrees', {
			method: 'POST',
			body: JSON.stringify({ getData: true }),
		})
			.then((res) => res.json())
			.catch((err) => {
				console.error(err)
				return { error: err }
			})
	}

	function saveData() {}
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<header>
	<h1>Admin Pagina</h1>
	<form on:submit|preventDefault={saveData} method="post">
		<button type="submit" class="confirm">Opslaan</button>
	</form>
	<form on:submit|preventDefault={getData} method="post">
		<button type="submit">Haal Data op</button>
	</form>
</header>
<main>
	<slot />
	{#if submit}
		{#await submit}
			<p>Data wordt opgehaald...</p>
		{:then res}
			<DataTable data={res.data} />
		{/await}
	{/if}
</main>

<style>
	header {
		margin: 0 auto;
		max-width: 50rem;
		display: flex;
		align-items: baseline;
		margin-bottom: 1rem;
		background-color: var(--color-white);
		position: sticky;
		top: 0;
		padding: 1rem 2rem;
	}

	header h1 {
		margin-right: auto;
	}

	header form {
		margin-left: 1rem;
	}

	main {
		padding-top: 0;
		margin: 0 auto;
		max-width: 50rem;
		padding: 1rem;
	}
</style>
