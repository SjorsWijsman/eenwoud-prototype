<svelte:head>
	<title>Draag een boom voor - Eenwoud</title>
</svelte:head>

<main>
	<slot />
	<form method="post" action="./boom-voordragen">
		<input type="text" name="name" />
		<input type="email" name="email" />
		<button type="submit">Submit</button>
	</form>
</main>
