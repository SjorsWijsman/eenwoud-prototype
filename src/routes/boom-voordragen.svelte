<script>
	import { supabase } from '$lib/db'
	import { imgSrcToBlob } from 'blob-util'

	let submit

	let fullName = 'Test Naam',
		mailAdress = 'test@email.com',
		treeLocation = '41.40338, 2.17403',
		treeMeaning = 'Deze boom betekent veel voor mij.',
		treeReason = 'Omdat ik dit een hele gave boom vind.',
		treeAge = 4,
		tips = 'Meer bomen',
		keepMeUpdated = true,
		photoEnvironment,
		photoDuo

	async function handleSubmit() {
		// Send a POST request to src/routes/contact.js endpoint
		const { data, error } = await fetch('/api/submitTree', {
			method: 'POST',
			body: JSON.stringify({
				fullName,
				mailAdress,
				treeLocation,
				treeMeaning,
				treeReason,
				treeAge,
				tips,
				keepMeUpdated,
			}),
			headers: { 'content-type': 'application/json' },
		}).then((res) => res.json())

		if (error) throw new Error(error)

		return data
	}

	async function sendImages(id) {
		const photos = [photoEnvironment[0], photoDuo[0]]
		const photoSuffixes = ['-env', '-duo']

		photos.forEach(async (photo, index) => {
			const { data, error } = await supabase.storage
				.from('eenwoud-bucket')
				.upload(`${id}${photoSuffixes[index]}`, photo)

			if (error) throw new Error(error)

			return data
		})
	}
</script>

<svelte:head>
	<title>Draag een boom voor - Eenwoud</title>
</svelte:head>

<main>
	<slot />
	<form on:submit|preventDefault={() => (submit = true)} method="post">
		<label for="name">Volledige Naam</label>
		<input required type="text" name="name" id="name" bind:value={fullName} />

		<label for="email">Email Adres</label>
		<input required type="email" name="email" id="email" bind:value={mailAdress} />

		<label for="photoEnvironment">Fotografeer je boom in zijn omgeving.</label>
		<input
			type="file"
			id="photoEnvironment"
			name="photoEnvironment"
			accept="image/png, image/jpeg"
			bind:files={photoEnvironment}
		/>

		<label for="photoDuo">Maak een duo portret van jezelf en de boom.</label>
		<input
			type="file"
			id="photoDuo"
			name="photoDuo"
			accept="image/png, image/jpeg"
			bind:files={photoDuo}
		/>

		<label for="treeLocation">
			Waar staat deze boom? Noteer de coordinaten van de standplaats. Gebruik geen komma's maar
			punten als decimaalteken. Onjuist: 41,40338, 2,17403. Juist: 41.40338, 2.17403.
		</label>
		<input required type="text" name="treeLocation" id="treeLocation" bind:value={treeLocation} />

		<label for="treeMeaning">Beschrijf wat deze boom voor jou persoonlijk betekent.</label>
		<input required type="text" name="treeMeaning" id="treeMeaning" bind:value={treeMeaning} />

		<label for="treeReason">Waarom draag jij deze boom voor voor Eenwoud?</label>
		<input required type="text" name="treeReason" id="treeReason" bind:value={treeReason} />

		<label for="treeAge">Weet je hoe oud deze boom is of hoe oud denk je dat deze boom is?</label>
		<input required type="number" name="treeAge" id="treeAge" bind:value={treeAge} />

		<label for="tips">Heb je nog tips, suggesties of opmerkingen voor mij?</label>
		<input required type="text" name="tips" id="tips" bind:value={tips} />

		<label for="keepMeUpdated">
			Wil jij op de hoogte blijven van de ontwikkelingen rondom Eenwoud?
		</label>
		<input
			required
			type="text"
			name="keepMeUpdated"
			id="keepMeUpdated"
			bind:value={keepMeUpdated}
		/>

		<button type="submit">Submit</button>
	</form>
	{#if submit}
		{#await handleSubmit()}
			<p>Aan het versturen...</p>
		{:then data}
			{#await sendImages(data.id)}
				<p>Foto's verstuurd</p>
			{/await}
		{:catch error}
			<p>Er is iets mis gegaan bij het ophalen van de data. Probeer het opnieuw:</p>
			<pre>{error.message}</pre>
		{/await}
	{/if}
</main>

<style>
	main {
		padding: 1rem;
		margin: 0 auto;
		max-width: 50rem;
	}
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
</style>
