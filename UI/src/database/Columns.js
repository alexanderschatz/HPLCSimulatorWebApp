import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '../components/common/Table'
import SortTableHead from '../components/common/SortTableHead'
import Button from '../components/common/Button'
import Form from '../components/common/Form'
import Modal from '../components/common/Modal/Modal'
import ModalHeader from '../components/common/Modal/ModalHeader'
import ModalBody from '../components/common/Modal/ModalBody'
import ModalFooter from '../components/common/Modal/ModalFooter'

import { insertColumn } from '../api/api'

export default class Columns extends Component {
	state = {
		showModal: false,
		newColumn: {
			columnName: '',
			length: '',
			inner_diameter: '',
			particle_size: '',
		},
	}

	addNewColumn = async () => {
		this.onChange('showModal')(false)
		await insertColumn(this.state.newColumn)
		await this.props.reFetchData()
	}

	onChange = prop => value => {
		this.setState({ [prop]: value })
	}

	onChangeColumn = prop => value => {
		this.setState({
			newColumn: {
				...this.state.newColumn,
				[prop]: value
			}
		})
	}

	render() {

		let { showModal, newColumn } = this.state
		let { columns, onSortBy, lastSort, sortOrder } = this.props

		let valid_length = !!(newColumn.length && !isNaN(+newColumn.length))
		let valid_innerDiameter = !!(newColumn.inner_diameter && !isNaN(+newColumn.inner_diameter))
		let valid_particleSize = !!(newColumn.particle_size && !isNaN(+newColumn.particle_size))

		return (
			<>
				<Table>
					<thead className='bg-white sticky-top'>
						<tr className='d-flex align-content-around'>
							<SortTableHead className='col-1' onClick={onSortBy} sortParam='pk_column' lastSort={lastSort} sortOrder={sortOrder} > ID </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='name' lastSort={lastSort} sortOrder={sortOrder} > Name </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='length' lastSort={lastSort} sortOrder={sortOrder} > Länge </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='inner_diameter' lastSort={lastSort} sortOrder={sortOrder} > innerer Durchmesser </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='particle_size' lastSort={lastSort} sortOrder={sortOrder} > Partikelgröße </SortTableHead>
							<th className=''><Button className='btn-sm' semantic='secondary' outline={true} onClick={() => this.onChange('showModal')(true)} > + </Button> </th>
						</tr>
					</thead>
					<tbody>
						{
							columns.map(c => (
								<tr key={c.pk_column} className='d-flex align-content-around'>
									<td className='col-1'>{c.pk_column}</td>
									<td className='col'>{c.name}</td>
									<td className='col'>{c.length}</td>
									<td className='col'>{c.inner_diameter}</td>
									<td className='col'>{c.particle_size}</td>
									<td className=''><Button className='btn-sm border-0' semantic='light' outline={true} disabled={true} onClick={() => console.log('nothing to see here!')} ></Button> </td>
								</tr>
							))
						}
					</tbody>
				</Table>

				<Modal active={showModal} >
					<ModalHeader onCancel={() => this.onChange('showModal')(false)}>
						<h5>Neues Laufmittel hinzufügen: </h5>
					</ModalHeader>
					<ModalBody>
						<div className='form-group col-12'>
							<label>Name:</label>
							<Form value={'' + newColumn.columnName ? newColumn.columnName : ''} type='text' onChange={(e) => this.onChangeColumn('columnName')(e.target.value)} />
						</div>
						<div className='form-group col-12'>
							<label>Länge:</label>
							<Form value={'' + newColumn.length ? newColumn.length : ''} type='text' onChange={(e) => this.onChangeColumn('length')(e.target.value)} isValid={valid_length} />
						</div>
						<div className='form-group col-12'>
							<label>innerer Durchmesser:</label>
							<Form value={'' + newColumn.inner_diameter ? newColumn.inner_diameter : ''} type='text' onChange={(e) => this.onChangeColumn('inner_diameter')(e.target.value)} isValid={valid_innerDiameter} />
						</div>
						<div className='form-group col-12'>
							<label>Partikelgröße:</label>
							<Form value={'' + newColumn.particle_size ? newColumn.particle_size : ''} type='text' onChange={(e) => this.onChangeColumn('particle_size')(e.target.value)} isValid={valid_particleSize} />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button className='col-6' onClick={() => this.onChange('showModal')(false)} semantic='secondary' > Abbrechen </Button>
						<Button className='col-6' onClick={() => this.addNewColumn()} semantic='success' outline={true}
							disabled={!(newColumn.columnName && valid_innerDiameter && valid_length && valid_particleSize)}
						>
							Hinzufügen
						</Button>
					</ModalFooter>
				</Modal>
			</>
		)
	}
}

Columns.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.object),
	onSortBy: PropTypes.func.isRequired,
	lastSort: PropTypes.string,
	sortOrder: PropTypes.number,
	reFetchData: PropTypes.func.isRequired,
}
