import supabase from '$lib/db'
import { downloadBase64Image, uploadImage } from '$lib/img'
import { v4 as uuid } from 'uuid'

export async function post(request) {
	const body = { ...request.body }

	console.log('Downloading images')

	const id = uuid()
	await downloadBase64Image(body.photoDuo, `${id}-duo`)
	await downloadBase64Image(body.photoEnvironment, `${id}-env`)

	console.log('Uploading images to supabase')

	await uploadImage(`${id}-duo`)
	await uploadImage(`${id}-env`)

	console.log('Sending data to supabase datatable')

	body.photoId = id
	delete body.photoDuo
	delete body.photoEnvironment

	await supabase
		.from('bomen')
		.insert(body)
		.then((result) => console.log(`Successfully inserted item: ${result}`))
		.catch((err) => console.error(`Failed to insert item: ${err}`))

	return { body: { success: true } }
}
