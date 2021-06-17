<script>
	import { supabase } from '$lib/db'

	let submit

	let firstName = '',
		lastName = '',
		mailAdress = '',
		treeLocation = '41.40338, 2.17403',
		treeMeaning = '',
		treeReason = '',
		treeAge = 0,
		tips = '',
		treeType = '',
		keepMeUpdated = true,
		photoEnvironment,
		photoDuo

	let photoUploadProgress = 0,
		photos = [],
		photoSuffixes = ['-env', '-duo']

	async function handleSubmit() {
		// Send a POST request to src/routes/contact.js endpoint
		const { data, error } = await fetch('/api/submitTree', {
			method: 'POST',
			body: JSON.stringify({
				fullName: `${firstName} ${lastName}`,
				mailAdress,
				treeLocation,
				treeMeaning,
				treeReason,
				treeAge,
				tips,
				treeType,
				keepMeUpdated,
			}),
			headers: { 'content-type': 'application/json' },
		}).then((res) => res.json())

		if (error) throw new Error(error)

		sendImages(data.id)

		return data
	}

	async function sendImages(id) {
		photoUploadProgress = 0
		photos = [photoEnvironment[0], photoDuo[0]]
		photos.forEach((photo, index) => {
			const { data, error } = supabase.storage
				.from('eenwoud-bucket')
				.upload(`${id}${photoSuffixes[index]}`, photo)
			if (error) throw new Error(error)

			photoUploadProgress += 1
		})
	}

	let page = 1

	function getFileData(event) {
		const name = event.target.files[0].name
		event.target.labels[0].innerText = name
	}
</script>

<svelte:head>
	<title>Draag een boom voor - Eenwoud</title>
</svelte:head>

<main>
	<slot />

	<form on:submit|preventDefault={() => (submit = true)} method="post">
		{#if page == 1}
			<section id="part1">
				<label for="firstname">Ik,</label>
				<input
					required
					type="text"
					name="firstname"
					id="firstname"
					bind:value={firstName}
					placeholder=" Voornaam"
				/><span>,</span>

				<label for="lastname" />
				<input
					required
					type="text"
					name="lastname"
					id="lastname"
					bind:value={lastName}
					placeholder=" Achternaam"
				/>
				<p>draag mijn boom voor, zodat de nazaten kunnen opgroeien in Eenwoud.</p>
				<label for="treeReason">De reden dat ik hiervoor gekozen heb is:</label>
				<textarea
					required
					type="text"
					name="treeReason"
					id="treeReason"
					bind:value={treeReason}
					placeholder="Schrijf hier waarom je een boom wilt voordragen"
				/>
			</section>
		{:else if page == 2}
			<section id="part2">
				<label for="treeMeaning"> Deze boom heeft heel betekenis voor mij omdat</label>
				<textarea
					required
					type="text"
					name="treeMeaning"
					id="treeMeaning"
					bind:value={treeMeaning}
					placeholder="Beschrijf waarom deze boom zo veel voor je betekent."
				/>
				<label for="treeType"> Wat voor soort boom is het? </label>
				<textarea
					required
					type="text"
					name="treeType"
					id="treeType"
					bind:value={treeType}
					placeholder="Boomsoort"
				/>
			</section>
		{:else if page == 3}
			<section id="part3">
				<p>Hier zie je foto van de boom in zijn omgeving</p>
				<label for="photoEnvironment" class="fotolabel">Klik hier om de foto te uploaden</label>
				<input
					type="file"
					id="photoEnvironment"
					name="photoEnvironment"
					accept="image/png, image/jpeg"
					bind:files={photoEnvironment}
					on:change={getFileData}
				/>
				<p>Ik heb ook nog een foto toegevoegd waar ik samen met de boom op de foto sta</p>
				<label for="photoDuo" class="fotolabel">Klik hier om de foto te uploaden</label>
				<input
					type="file"
					id="photoDuo"
					name="photoDuo"
					accept="image/png, image/jpeg"
					bind:files={photoDuo}
					on:change={getFileData}
				/>
			</section>
		{:else if page == 4}
			<section id="part4">
				<label for="treeAge"
					>Tot slot zal ik nog wat gegevens meesturen over de boom waar je miscchien nog wat mee kan
					doen in de toekomst. De leeftijd van de boom is ongeveer</label
				>
				<input
					required
					type="number"
					name="treeAge"
					id="treeAge"
					bind:value={treeAge}
					placeholder="Vul de leeftijd van de boom in"
				/>
				<label for="treeLocation"> De coordinaten van de boom zijn </label>
				<input
					required
					type="text"
					name="treeLocation"
					id="treeLocation"
					placeholder="52.132633.5.291266"
					bind:value={treeLocation}
				/>
			</section>
		{:else if page == 5}
			<section id="part5">
				<label for="email">Mocht je mij nog willen bereiken kun je me mailen naar</label>
				<input
					required
					type="email"
					name="email"
					id="email"
					bind:value={mailAdress}
					placeholder="Vul je emailadres in"
				/>
				<br /><br />
				<p>P.S.</p>
				<label for="tips">Ik zou je dit nog wel willen zeggen (dit is niet verplicht): </label>
				<textarea
					required
					type="text"
					name="tips"
					id="tips"
					bind:value={tips}
					placeholder="Tips, suggesties, opmerkingen"
				/>
			</section>
		{:else if page == 6}
			<section id="part6">
				<label for="keepMeUpdated"
					>Graag zou ik op de hoogte gehouden worden van de ontwikkelingen rondom Eenwoud</label
				>
				<input
					type="checkbox"
					name="keepMeUpdated"
					id="keepMeUpdated"
					bind:checked={keepMeUpdated}
				/>
				<span>Ja</span><br /><br />
				{#if firstName && lastName && mailAdress && treeLocation && treeMeaning && treeReason && treeAge && treeType}
					<button type="submit" class="aanmelden" on:click={() => (submit = false)}
						>Boom aanmelden</button
					>
				{:else}
					<p>Je hebt nog niet alles ingevuld.</p>
				{/if}
			</section>
		{/if}
		{#if submit}
			{#await handleSubmit()}
				<p>Data versturen...</p>
			{:then data}
				{#if photoUploadProgress !== photos.length}
					<p>Foto's verstuurd: {photoUploadProgress}/{photos.length}</p>
				{:else}
					<p>Je voordracht is succesvol verstuurd!</p>
				{/if}
			{:catch error}
				<p>Er is iets mis gegaan bij het ophalen van de data. Probeer het opnieuw:</p>
				<pre>{error.message}</pre>
			{/await}
		{/if}
		{#if page != 1}
			<button
				type="button"
				on:click={() => {
					page--
				}}>Vorige</button
			>{/if}
		{#if page != 6}
			<button
				type="button"
				on:click={() => {
					page++
				}}>Volgende</button
			>{/if}
		<img src="./resources/images/eenwoud-logo-stamp.svg" alt="Eenwoud Logo" />
	</form>
</main>

<style>
	form input,
	form p,
	form textarea,
	form label {
		font-family: 'Satisfy', cursive;
		font-size: 20px;
		background: transparent;
	}

	main {
		background-image: url('../../../resources/images/tree-background.webp');
		background-size: cover;
		background-position: center center;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	form {
		background-color: #fff;
		margin-top: 0px;
		width: 100%;
		max-width: 320px;
		/* background: linear-gradient(to bottom, #9a9aff 10%, transparent 10%),
			linear-gradient(to left, red, red), linear-gradient(to left, white, white);
		background-size: 500px 15px, 1px auto, 500px auto;
		background-position: 0px 18px, 50px 0px, 0px 0px;
		background-repeat: repeat-y, no-repeat, no-repeat; */

		box-shadow: 0px 0px 5px #000;
		overflow-x: hidden;
		line-height: 10px;
		padding: 50px;
		position: relative;
		border: 1px solid #000;
		border-width: thick;
		border-style: double;
	}

	form img {
		max-width: 85px;
		position: absolute;
		right: 10px;
		transform: rotate(-19deg);
		background-color: #dedede;
		padding: 8px;
		border-radius: 110px;
		opacity: 0.3;
	}

	@media screen and (min-width: 767px) {
		form {
			max-width: 400px;
			padding: 50px;
		}
	}

	form:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		background: url(https://i.ibb.co/P9SVTff/nailkopie.png);
		background-repeat: no-repeat;
		background-size: contain;
		width: 50px;
		height: 50px;
		margin-left: auto;
		margin-right: auto;
		right: 0;
		display: block;
		background-position: center 0px;
	}

	form section {
		min-height: 500px;
	}

	section#part1 {
		visibility: visible;
		display: block;
		margin-top: 0px;
		padding-top: 0px;
	}

	form section label {
		display: block;
		margin: 15px 0px;
	}

	form section input {
		border: none;
	}

	form section textarea {
		width: 100%;
		min-height: 200px;
		border: none;
	}

	.fotolabel {
		padding: 15px;
		border: 3px dashed red;
	}

	form input[type='file'] {
		visibility: hidden;
		position: absolute;
		z-index: -100;
	}
</style>
