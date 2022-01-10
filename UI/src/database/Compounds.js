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

import { insertCompound } from '../api/api'

export default class Compounds extends Component {
	state = {
		showModal: false,
		newCompound: {
			compoundName: '',
			molar_mass: '',
			density: '',
			molar_volume: '',
		},
	}

	addNewCompound = async () => {
		this.onChange('showModal')(false)
		await insertCompound(this.state.newCompound)
		await this.props.reFetchData()
	}

	onChange = prop => value => {
		this.setState({ [prop]: value })
	}

	onChangeCompound = prop => value => {
		this.setState({
			newCompound: {
				...this.state.newCompound,
				[prop]: value
			}
		})
	}

	render() {

		let { showModal, newCompound } = this.state
		let { compounds, onSortBy, lastSort, sortOrder } = this.props

		
		let valid_molarMass = !!(newCompound.molar_mass && !isNaN(+newCompound.molar_mass))
		let valid_density = !!(newCompound.density && !isNaN(+newCompound.density))
		// let valid_molarVolume = newCompound.molar_mass && !isNaN(+newGlobal.s_intercept)

		return (
			<>
				<Table>
					<thead className='bg-white sticky-top'>
						<tr className='d-flex align-content-around'>
							<SortTableHead className='col-1' onClick={onSortBy} sortParam='pk_compound' lastSort={lastSort} sortOrder={sortOrder} > ID </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='name' lastSort={lastSort} sortOrder={sortOrder} > Name </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='molar_mass' lastSort={lastSort} sortOrder={sortOrder} > molare Masse </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='density' lastSort={lastSort} sortOrder={sortOrder} > Dichte </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='molar_volume' lastSort={lastSort} sortOrder={sortOrder} > molares Volumen </SortTableHead>
							<th className=''><Button className='btn-sm' semantic='secondary' outline={true} onClick={() => this.onChange('showModal')(true)} > + </Button> </th>
						</tr>
					</thead>
					<tbody>
						{
							compounds.map(c => (
								<tr key={c.pk_compound} className='d-flex align-content-around'>
									<td className='col-1'>{c.pk_compound}</td>
									<td className='col'>{c.name}</td>
									<td className='col'>{c.molar_mass}</td>
									<td className='col'>{c.density}</td>
									<td className='col'>{c.molar_volume ? c.molar_volume : ''}</td>
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
							<Form value={'' + newCompound.compoundName ? newCompound.compoundName : ''} type='text' onChange={(e) => this.onChangeCompound('compoundName')(e.target.value)} />
						</div>
						<div className='form-group col-12'>
							<label>molare Masse:</label>
							<Form value={'' + newCompound.molar_mass ? newCompound.molar_mass : ''} type='text' onChange={(e) => this.onChangeCompound('molar_mass')(e.target.value)} isValid={valid_molarMass} />
						</div>
						<div className='form-group col-12'>
							<label>Dichte:</label>
							<Form value={'' + newCompound.density ? newCompound.density : ''} type='text' onChange={(e) => this.onChangeCompound('density')(e.target.value)} isValid={valid_density} />
						</div>
						<div className='form-group col-12'>
							<label>molares Volumen:</label>
							<Form value={'' + newCompound.molar_volume ? newCompound.molar_volume : ''} type='text' onChange={(e) => this.onChangeCompound('molar_volume')(e.target.value)} />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button className='col-6' onClick={() => this.onChange('showModal')(false)} semantic='secondary' > Abbrechen </Button>
						<Button className='col-6' onClick={() => this.addNewCompound()} semantic='success' outline={true}
							disabled={!(newCompound.compoundName && valid_density && valid_molarMass)}
						>
							Hinzufügen
						</Button>
					</ModalFooter>
				</Modal>
			</>
		)
	}
}

Compounds.propTypes = {
	compounds: PropTypes.arrayOf(PropTypes.object),
	onSortBy: PropTypes.func.isRequired,
	lastSort: PropTypes.string,
	sortOrder: PropTypes.number,
	reFetchData: PropTypes.func.isRequired,
}
