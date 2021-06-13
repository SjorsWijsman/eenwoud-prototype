<script>
	let textLayer = null
</script>

<section bind:this={textLayer}>
	<p>Welkom in Eenwoud.</p>
	<p>
		Eenwoud is een bos waarin de nazaten van betekenisvolle bomen proberen samen 1000 jaar te
		overleven.
	</p>
	<p>
		Ook jij kan een boom voordragen aan Eenwoud.
		<a href="./boom-voordragen">Draag nu een boom voor</a>
	</p>
	<p>Maak hier een wandeling door de digitale versie van Eenwoud \/</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100vw;
		height: 250vh;
		position: absolute;
		z-index: 5;
		top: 150vh;
	}

	section :global(p) {
		color: white;
		font-size: 2rem;
		max-width: 45rem;
		margin: 1rem;
		margin-left: 10vh;
		text-shadow: 1px 1px 5px rgb(6, 8, 7);
	}
</style>
