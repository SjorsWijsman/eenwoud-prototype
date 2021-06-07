import { treeCollection } from '$lib/store'

export function post(request) {
	treeCollection.update((value) => {
		console.log(value, request)
		return value
	})
}
