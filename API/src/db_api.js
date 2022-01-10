/* eslint-disable no-console */

const db = require('./db')

// const { fetchAlertsOnSignUp, acknowledgeAlert } = require('./sql/alerts')
// const { fetchUserByUsername } = require('./sql/users')

const { getColumns, getSolvents, getCompounds, getGlobals, insertColumn, insertCompound, insertGlobal, insertSolvent } = require('./sql/hplc')

const api = {}

const runQuery = async ({ query, params }) => {
	try {
		return await db.query(query, params)
	} catch (error) {
		console.log('DB ERR', error)
		throw error
	}
}

api.getData = async () => {
	const [columns] = await runQuery({ query: getColumns() })
	const [solvents] = await runQuery({ query: getSolvents() })
	const [compounds] = await runQuery({ query: getCompounds() })
	const [globals] = await runQuery({ query: getGlobals() })
	return { columns, solvents, compounds, globals }
}

api.insertColumn = async ({ columnName, length, inner_diameter, particle_size }) => {
	const [rows] = await runQuery({ query: insertColumn({ columnName, length, inner_diameter, particle_size }) })
	return rows.insertId
}
api.insertCompound = async ({ compoundName, molar_mass, molar_volume, density }) => {
	const [rows] = await runQuery({ query: insertCompound({ compoundName, molar_mass, molar_volume, density }) })
	return rows.insertId
}
api.insertSolvent = async (solventName) => {
	const [rows] = await runQuery({ query: insertSolvent(solventName) })
	return rows.insertId
}
api.insertGlobal = async ({ fk_column, fk_solvent, fk_compound, kw_slope, kw_intercept, s_slope, s_intercept }) => {
	const [rows] = await runQuery({ query: insertGlobal({ fk_column, fk_solvent, fk_compound, kw_slope, kw_intercept, s_slope, s_intercept }) })
	return rows.insertId
}

// api.getAlerts = async (accID) => {
// 	const [rows] = await runQuery({ query: fetchAlertsOnSignUp(accID) })
// 	return rows
// }

// api.fetchUserByUsername = async (username, password) => {
// 	const [rows] = await runQuery({ query: fetchUserByUsername(username) })

// 	let user = rows[0]
// 	if (user) {
// 		let passMatch = password === user.password
// 		if (!passMatch) {
// 			throw ('wrong password')
// 		}
// 		console.log(`user ${username} successfully authenticated`)
// 		return user
// 	} else {
// 		throw ('unknown user')
// 	}
// }

module.exports = api