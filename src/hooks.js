import { default as mongodb } from 'mongodb'
import { DB_USER, DB_PASS, DB_NAME } from '$lib/env'
import { treeCollection } from '$lib/store'

// Connect to MongoDB
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.mongodb.net/eenwoud-database?retryWrites=true&w=majority`
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}
const MongoClient = mongodb.MongoClient
let db = null

connectDatabase()

// Connect to database & store treeCollection in server side store
function connectDatabase() {
	MongoClient.connect(uri, options, (err, client) => {
		if (err) throw err
		else {
			db = client.db('eenwoud-database')
			treeCollection.set(db.collection('bomen'))
		}
	})
}

export async function handle({ request, resolve }) {
	let treeStore = null
	treeCollection.update((value) => {
		treeStore = value
		return value
	})

	if (!treeStore) {
		connectDatabase()
	}

	const response = await resolve(request)

	return {
		...response,
		headers: {
			...response.headers,
		},
	}
}
