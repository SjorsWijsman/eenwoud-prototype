<script>
	import { supabase } from '$lib/db'

	export let data

	let expand = false

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
		title: 'Titel',
	}

	let timestamp = new Date(data.timestamp).toLocaleString()

	function getImageURL(imgPath) {
		return supabase.storage.from('eenwoud-bucket').getPublicUrl(`${imgPath}`).publicURL
	}
</script>

<article>
	<div on:click={() => (expand = !expand)}>
		<h2>{data.fullName}</h2>
		<p>{data.status}</p>
		<p>{timestamp}</p>
	</div>
	{#if expand}
		<div>
			<h3>Contact</h3>
			<p>{displayedData.mailAdress}</p>
			<p>{data.mailAdress}</p>
			<p>{displayedData.keepMeUpdated}</p>
			<p>{data.keepMeUpdated}</p>

			<h3>Voorgedragen Boom</h3>
			<p>{displayedData.treeMeaning}</p>
			<p>{data.treeMeaning}</p>
			<p>{displayedData.treeReason}</p>
			<p>{data.treeReason}</p>
			<p>{displayedData.treeAge}</p>
			<p>{data.treeAge}</p>
			<p>{displayedData.treeLocation}</p>
			<p>{data.treeLocation}</p>

			<h3>Foto's</h3>
			<p>{displayedData.photoDuo}</p>
			<img src={getImageURL(`${data.id}-duo`)} alt="" />
			<p>{displayedData.photoEnvironment}</p>
			<img src={getImageURL(`${data.id}-env`)} alt="" />

			<h3>Admin</h3>
			<p>{displayedData.tips}</p>
			<p>{data.tips}</p>
		</div>
		<div>
			<button class="decline">Afwijzen</button>
			<button class="confirm">Accepteren</button>
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
	}

	article div:first-child :last-child {
		text-align: right;
	}

	article div:nth-child(2) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0.5rem;
		padding-top: 0;
	}

	article div:nth-child(3) {
		display: flex;
		justify-content: flex-start;
		gap: 1rem;
		margin: 1rem 0;
	}

	h3 {
		grid-column: 1 / 3;
		margin-top: 1rem;
		margin-bottom: -0.2rem;
	}
</style>
