import { fetchAsync, postAsync } from './utils'
import toastr from 'toastr'

export async function fetchData() {
	try {
		let { data, error } = await fetchAsync('getData')
		if (error) throw error
		toastr.success('Daten wurden geladen')
		return data
	} catch (error) {
		toastr.error('Die Daten konnten nicht geladen werden!')
		return null
	}
}

export async function insertColumn(newColumn) {
	try {
		let { insertId, error } = await postAsync('insertColumn', newColumn)
		if (error) throw error
		toastr.success(`Die Säule wurde gespeichert (Id: ${insertId})`)
	} catch (error) {
		toastr.error('Die Säule konnte nicht gespeichert werden!')
		console.log(error)
		return null
	}
}

export async function insertSolvent(newSolvent) {
	try {
		let { insertId, error } = await postAsync('insertSolvent', newSolvent)
		if (error) throw error
		toastr.success(`Das Laufmittel wurde gespeichert (Id: ${insertId})`)
		return insertId
	} catch (error) {
		toastr.error('Das Laufmittel konnte nicht gespeichert werden!')
		console.log(error)
		return null
	}
}

export async function insertCompound(newCompound) {
	try {
		let { insertId, error } = await postAsync('insertCompound', newCompound)
		if (error) throw error
		toastr.success(`Der Analyt wurde gespeichert (Id: ${insertId})`)
		return insertId
	} catch (error) {
		toastr.error('Der Analyt konnte nicht gespeichert werden!')
		console.log(error)
		return null
	}
}

export async function insertGlobal(newGlobal) {
	try {
		let { insertId, error } = await postAsync('insertGlobal', newGlobal)
		if (error) throw error
		toastr.success(`Die Daten wurden gespeichert (Id: ${insertId})`)
		return insertId
	} catch (error) {
		toastr.error('Die Daten konnte nicht gespeichert werden!')
		console.log(error)
		return null
	}
}

