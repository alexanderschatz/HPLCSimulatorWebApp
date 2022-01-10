/* eslint-disable no-console */
const mysql = require('mysql2')
const path = require('path')

process.env.NODE_CONFIG_DIR = path.join(__dirname, '/config/')
const config = require('config')

const pool = mysql.createPool(config.get('dbConfig'))

const promisePool = pool.promise()

promisePool.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Database connection was closed.')
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('Database has too many connections.')
		}
		if (err.code === 'ECONNREFUSED') {
			console.error('Database connection was refused.')
		}
	}
	if (connection) connection.release()
})

module.exports = promisePool
