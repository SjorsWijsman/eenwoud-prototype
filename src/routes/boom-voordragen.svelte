<script>
	let submit

	let fullName, mailAdress

	function handleSubmit(e) {
		// Send a POST request to src/routes/contact.js endpoint
		submit = fetch('/boom-voordragen', {
			method: 'POST',
			body: JSON.stringify({
				fullName,
				mailAdress,
			}),
			headers: { 'content-type': 'application/json' },
		})
			.then((resp) => resp.json())
			.catch((err) => {
				console.error(err)
				return { error: err }
			})
	}
</script>

<svelte:head>
	<title>Draag een boom voor - Eenwoud</title>
</svelte:head>

<main>
	<slot />
	<form on:submit|preventDefault={handleSubmit} method="post">
		<input required type="text" name="name" bind:value={fullName} />
		<input required type="email" name="email" bind:value={mailAdress} />
		<button type="submit">Submit</button>
	</form>
	{#if submit}
		{#await submit}
			<p>Sending...</p>
		{:then resp}
			<p>🎉 Done!</p>
			<pre>RESPONSE: {JSON.stringify(resp, null, 2)}</pre>
		{:catch err}
			<pre>ERROR: {JSON.stringify(err, null, 2)}</pre>
		{/await}
	{/if}
</main>
