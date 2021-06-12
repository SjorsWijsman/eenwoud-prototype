import { supabase } from '$lib/db'

export async function post() {
	let { data, error } = await supabase.from('bomen').select()

	return { body: JSON.stringify({ data: data.body, error }) }
}
