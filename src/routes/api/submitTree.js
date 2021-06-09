import supabase from '$lib/db'

export async function post(request) {
	console.log(request.body)
	await supabase
		.from('bomen')
		.insert({ ...request.body })
		.then((result) => console.log(`Successfully inserted item with: ${result}`))
		.catch((err) => console.error(`Failed to insert item: ${err}`))

	return { body: { success: true } }
}
