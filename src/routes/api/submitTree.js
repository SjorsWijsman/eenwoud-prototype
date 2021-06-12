import { supabase } from '$lib/db'

export async function post(request) {
	const body = { ...request.body }

	// Upload data
	let { data, error } = await supabase.from('bomen').insert(body)

	return { body: JSON.stringify({ data: data[0], error }) }
}
