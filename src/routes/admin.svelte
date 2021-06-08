<script>
	let submit

	function getData() {
		submit = fetch('/admin', {
			method: 'POST',
			body: JSON.stringify({ getData: true }),
		})
			.then((res) => res.json())
			.catch((err) => {
				console.error(err)
				return { error: err }
			})
	}
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<main>
	<slot />
	<form on:submit|preventDefault={getData} method="post">
		<button type="submit">Haal Data op</button>
	</form>
	{#if submit}
		{#await submit}
			<p>Data wordt opgehaald...</p>
		{:then res}
			<pre>{JSON.stringify(res, null, 2)}</pre>
		{/await}
	{/if}
</main>

<style>
	main {
		padding: 1rem;
		margin: 0 auto;
		max-width: 50rem;
	}
</style>
