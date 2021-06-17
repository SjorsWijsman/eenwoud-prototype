<script>
	import { supabase } from '$lib/db'

	export let id,
		dataCopy,
		fullName,
		status,
		mailAdress,
		keepMeUpdated,
		treeMeaning,
		treeReason,
		treeAge,
		treeLocation,
		treeType,
		tips,
		timestamp,
		title,
		audioLink

	let expand = false

	// Update data object on change
	let dataChanges
	$: dataChanges = {
		fullName,
		status,
		mailAdress,
		keepMeUpdated,
		treeMeaning,
		treeReason,
		treeAge,
		treeLocation,
		tips,
		timestamp,
		title,
		id,
		audioLink,
	}

	const displayedData = {
		keepMeUpdated: 'Hou me op de hoogte',
		mailAdress: 'Mailadres',
		photoDuo: 'Foto samen',
		photoEnvironment: 'Foto omgeving',
		tips: 'Tips of suggesties',
		treeAge: 'Boom leeftijd',
		treeLocation: 'Boom locatie',
		treeMeaning: 'Boom betekenis',
		treeReason: 'Reden van voordracht',
		treeType: 'Boomsoort',
		title: 'Titel',
		status: 'Huidige status',
		audioLink: 'Link naar audioverhaal',
	}

	let localTimestamp = new Date(timestamp).toLocaleString()

	function getImageURL(imgPath) {
		return supabase.storage.from('eenwoud-bucket').getPublicUrl(`${imgPath}`).publicURL
	}

	async function updateData() {
		const { data, error } = await supabase
			.from('bomen')
			.update(dataChanges)
			.match({ id: dataChanges.id })

		if (error) throw new Error(error)

		dataCopy = data[0]
	}
</script>

<article>
	<div on:click={() => (expand = !expand)}>
		<h2>{fullName}</h2>
		<p>{status}</p>
		<p>{localTimestamp}</p>
	</div>
	{#if expand}
		<div>
			<h3>Contact</h3>
			<p class="title">{displayedData.mailAdress}</p>
			<input class="value" type="text" bind:value={mailAdress} />
			<p class="title">{displayedData.keepMeUpdated}</p>
			<input class="value" type="checkbox" bind:checked={keepMeUpdated} />
			<h3>Voorgedragen Boom</h3>
			<p class="title">{displayedData.treeMeaning}</p>
			<textarea class="value" bind:value={treeMeaning} />
			<p class="title">{displayedData.treeReason}</p>
			<textarea class="value" bind:value={treeReason} />
			<p class="title">{displayedData.treeAge}</p>
			<input class="value" type="number" bind:value={treeAge} />
			<p class="title">{displayedData.treeLocation}</p>
			<input class="value" type="text" bind:value={treeLocation} />
			<p class="title">{displayedData.treeType}</p>
			<input class="value" type="text" bind:value={treeType} />

			<h3>Foto's</h3>
			<p class="title">{displayedData.photoDuo}</p>
			<img class="value" src={getImageURL(`${id}-duo`)} alt="" />
			<p class="title">{displayedData.photoEnvironment}</p>
			<img class="value" src={getImageURL(`${id}-env`)} alt="" />

			<h3>Admin</h3>
			<p class="title">{displayedData.status}</p>
			<p class="value">{status}</p>
			<p class="title">{displayedData.tips}</p>
			<textarea class="value" bind:value={tips} />
			<p class="title">{displayedData.title}</p>
			<input class="value" type="text" bind:value={title} />
			<p class="title">{displayedData.audioLink}</p>
			<input class="value" type="text" bind:value={audioLink} />
		</div>
		<div>
			<button class="decline" on:click={() => (status = 'Afgewezen')}>Afwijzen</button>
			<button class="confirm" on:click={() => (status = 'Geaccepteerd')}>Accepteren</button>
			<!-- Check if there are data changes -->
			{#if !Object.values(dataChanges).every((value) => Object.values(dataCopy).includes(value))}
				<button class="edit" on:click={() => updateData()}>Veranderingen Opslaan</button>
			{/if}
		</div>
	{/if}
</article>

<style>
	article {
		width: 100%;
		background-color: var(--color-light-grey);
	}

	article:nth-child(odd) {
		background-color: var(--color-light-grey-lighter);
	}

	article div {
		padding: 1rem;
	}

	article div:first-child {
		display: grid;
		align-items: baseline;
		grid-template-columns: 2fr 1fr max-content;
		margin-bottom: -0.5rem;
		position: sticky;
		top: 0;
		background-color: inherit;
		z-index: 1;
	}

	article div:first-child :last-child {
		text-align: right;
	}

	article div:nth-child(2) {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-areas: 'title value';
		grid-gap: 1rem;
		padding-top: 0;
		align-items: center;
	}

	.title {
		grid-column: title;
		opacity: 0.7;
	}

	.value {
		grid-column: value;
	}

	article div:nth-child(3) {
		display: flex;
		justify-content: flex-start;
		gap: 1rem;
		margin: 1rem 0;
	}

	article div:nth-child(3) :nth-child(3) {
		margin-left: auto;
	}

	h3 {
		grid-column: 1 / 3;
		margin-top: 1rem;
		margin-bottom: -0.2rem;
	}

	img {
		object-fit: contain;
		max-width: 100%;
	}
</style>
