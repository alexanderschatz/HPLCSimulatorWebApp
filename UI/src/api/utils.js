const ENDPOINT = process.env.API_ENDPOINT || '/api/'

// import  from '../../../tools/api_config'

export async function fetchAsync(request) {
	let res = await fetch(`${ENDPOINT + request}/`)
	console.log(`${ENDPOINT + request}/`)
	return await res.json()
}

export async function postAsync(request, body) {
	let res = await fetch(`${ENDPOINT + request}/`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(body),
	})
	return await res.json()
}
