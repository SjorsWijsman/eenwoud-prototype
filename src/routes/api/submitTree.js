import { supabase } from '$lib/db'
import { downloadBase64Image, uploadImage } from '$lib/img'
import { v4 as uuid } from 'uuid'

export async function post(request) {
	const body = { ...request.body }

	console.log('Downloading images')

	const photoId = uuid()
	await downloadBase64Image(body.photoDuo, `${photoId}-duo`)
	await uploadImage(`${photoId}-duo`)

	await downloadBase64Image(body.photoEnvironment, `${photoId}-env`)
	await uploadImage(`${photoId}-env`)

	body.photoId = photoId
	delete body.photoDuo
	delete body.photoEnvironment

	await supabase
		.from('bomen')
		.insert(body)
		.then((result) => console.log(`Successfully inserted item: ${result}`))
		.catch((err) => console.error(`Failed to insert item: ${err}`))

	return { body: { success: true } }
}
