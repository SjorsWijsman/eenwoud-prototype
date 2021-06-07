import { treeCollection } from '$lib/store'

export async function post(request) {
	let collection
	treeCollection.update((value) => {
		collection = value
		return collection
	})

	await collection
		.insertOne({ ...request.body })
		.then((result) => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
		.catch((err) => console.error(`Failed to insert item: ${err}`))

	return { body: { success: true } }
}
