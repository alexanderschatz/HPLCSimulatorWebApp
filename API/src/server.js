const express = require('express')
const bodyParser = require('body-parser')
const dbApi = require('./db_api')

const app = express()
const cors = require('cors')

app.use(cors({ credentials: true, origin: true }))
app.use(express.static('../public'))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8067

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

app.get('/api/getData', (req, res) => {
	return dbApi
		.getData()
		.then(data => res.json({ data }))
		.catch(error => res.json({ error }))
})

app.post('/api/insertColumn', (req, res) => {
	let { columnName, length, inner_diameter, particle_size } = req.body
	return columnName && length && inner_diameter && particle_size
		? dbApi
			.insertColumn({ columnName, length, inner_diameter, particle_size })
			.then(insertId => res.json({ insertId }))
			.catch(error => res.json({ error }))
		: res.json({ error: 'missing params' })
})

app.post('/api/insertSolvent', (req, res) => {
	let { solventName } = req.body
	return solventName
		? dbApi
			.insertSolvent(solventName)
			.then(insertId => res.json({ insertId }))
			.catch(error => res.json({ error }))
		: res.json({ error: 'missing params' })
})

app.post('/api/insertCompound', (req, res) => {
	let { compoundName, molar_mass, molar_volume, density } = req.body
	return compoundName && molar_mass && density
		? dbApi
			.insertCompound({ compoundName, molar_mass, molar_volume, density })
			.then(insertId => res.json({ insertId }))
			.catch(error => res.json({ error }))
		: res.json({ error: 'missing params' })
})

app.post('/api/insertGlobal', (req, res) => {
	let { fk_column, fk_solvent, fk_compound, kw_slope, kw_intercept, s_slope, s_intercept } = req.body
	return fk_column && fk_solvent && fk_compound && kw_slope && kw_intercept && s_slope && s_intercept
		? dbApi
			.insertGlobal({ fk_column, fk_solvent, fk_compound, kw_slope, kw_intercept, s_slope, s_intercept })
			.then(insertId => res.json({ insertId }))
			.catch(error => res.json({ error }))
		: res.json({ error: 'missing params' })
})


app.listen(PORT, () => console.log(`listening on port: ${PORT}`))