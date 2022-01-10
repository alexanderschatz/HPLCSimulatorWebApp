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

import { insertSolvent } from '../api/api'

export default class Solvents extends Component {
	state = {
		showModal: false,
		newSolvent: {
			solventName: '',
		},
	}

	addNewSolvent = async () => {
		this.onChange('showModal')(false)
		await insertSolvent(this.state.newSolvent)
		await this.props.reFetchData()
	}

	onChange = prop => value => {
		this.setState({ [prop]: value })
	}

	onChangeSolvent = prop => value => {
		this.setState({
			newSolvent: {
				...this.state.newSolvent,
				[prop]: value
			}
		})
	}

	render() {

		let { showModal, newSolvent } = this.state
		let { solvents, onSortBy, lastSort, sortOrder } = this.props

		return (
			<>
				<Table>
					<thead className='bg-white sticky-top'>
						<tr className='d-flex align-content-around'>
							<SortTableHead className='col-1' onClick={onSortBy} sortParam='pk_column' lastSort={lastSort} sortOrder={sortOrder} > ID </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='name' lastSort={lastSort} sortOrder={sortOrder} > Name </SortTableHead>
							<th className=''><Button className='btn-sm' semantic='secondary' outline={true} onClick={() => this.onChange('showModal')(true)} > + </Button> </th>
						</tr>
					</thead>
					<tbody>
						{
							solvents.map(c => (
								<tr key={c.pk_solvent} className='d-flex align-content-around'>
									<td className='col-1'>{c.pk_solvent}</td>
									<td className='col'>{c.name}</td>
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
							<Form value={'' + newSolvent.solventName ? newSolvent.solventName : ''} type='text' onChange={(e) => this.onChangeSolvent('solventName')(e.target.value)} />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button className='col-6' onClick={() => this.onChange('showModal')(false)} semantic='secondary' > Abbrechen </Button>
						<Button className='col-6' onClick={() => this.addNewSolvent()} semantic='success' outline={true}
							disabled={!(newSolvent.solventName)}
						>
							Hinzufügen
						</Button>
					</ModalFooter>
				</Modal>
			</>
		)
	}
}

Solvents.propTypes = {
	solvents: PropTypes.arrayOf(PropTypes.object),
	onSortBy: PropTypes.func.isRequired,
	lastSort: PropTypes.string,
	sortOrder: PropTypes.number,
	reFetchData: PropTypes.func.isRequired,
}
