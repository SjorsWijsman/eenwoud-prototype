import { supabase } from '$lib/db'

export async function post() {
	let { data, error } = await supabase.from('bomen').select()

	return { body: { data: JSON.stringify(data.body), error } }
}
