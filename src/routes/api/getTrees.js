import supabase from '$lib/db'

export async function post() {
	let data = await supabase.from('bomen').select()

	return { body: { data: JSON.stringify(data.body), success: true } }
}
