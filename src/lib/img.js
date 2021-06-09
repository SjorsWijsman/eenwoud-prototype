import supabase from '$lib/db'
import sharp from 'sharp'
import fs from 'fs'
import FormData from 'form-data'

// From base64 to image file
export async function downloadBase64Image(base64, filename) {
	const imgData = base64.split(',')[1]

	try {
		return await sharp(Buffer.from(imgData, 'base64'))
			.rotate()
			.resize({ width: 200, height: 200 })
			.webp()
			.toFile(`uploads/${filename}.webp`)
	} catch (err) {
		console.log(err)
	}
}

// Upload image from /uploads directory to supabase & delete
export async function uploadImage(id) {
	const path = `${supabase.storage.url}/object/eenwoud-bucket/${id}`
	const headers = supabase.storage.headers
	const filePath = `uploads/${id}.webp`
	const data = await fs.promises.readFile(filePath)

	const formData = new FormData()

	formData.append('', data, filePath)
	formData.append('cacheControl', 3600)

	await fetch(path, {
		method: 'POST',
		headers,
		body: formData,
	})

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error(err)
			return
		}
	})
}
