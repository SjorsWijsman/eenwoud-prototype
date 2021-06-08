import { treeCollection } from '$lib/store'

export async function post() {
	let collection
	treeCollection.update((value) => {
		collection = value
		return collection
	})

	let collectionData = await collection.find().toArray()
	return { body: { data: JSON.stringify(collectionData), success: true } }
}
