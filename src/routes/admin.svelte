<script>
	import DataTable from '../components/DataTable.svelte'
	import { supabase } from '$lib/db'
	import { session } from '$app/stores'

	let email, password

	async function signIn() {
		const { user, session: sbSession, error } = await supabase.auth.signIn({
			email,
			password,
		})
		session.set(sbSession)
	}

	async function getData() {
		const { data, error } = await supabase.from('bomen').select()
		return { data, error }
	}

	function saveData() {}
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>
<slot />
<header>
	<h1>Admin Pagina</h1>
	{#if $session.user && $session.user.role === 'authenticated'}
		<form on:submit|preventDefault={saveData} method="post">
			<button type="submit" class="confirm">Opslaan</button>
		</form>
	{/if}
</header>
<main>
	{#if $session.user && $session.user.role === 'authenticated'}
		{#await getData()}
			<p>Data wordt opgehaald...</p>
		{:then res}
			{#if res.data}
				<DataTable data={res.data} />
			{:else}
				<p>Er is iets mis gegaan bij het ophalen van de data. Probeer het opnieuw:</p>
				<pre>{res.error.message}</pre>
			{/if}
		{/await}
	{:else}
		<form on:submit|preventDefault={signIn}>
			<label
				>Email
				<input type="text" name="email" bind:value={email} />
			</label>
			<label
				>Password
				<input type="password" name="password" bind:value={password} />
			</label>
			{#if email && password}
				<input type="submit" value="Inloggen" />
			{/if}
		</form>
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

	main form {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		max-width: 20rem;
	}

	main form label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	main form input {
		padding: 0.4rem;
		margin-top: -0.5rem;
	}
</style>
