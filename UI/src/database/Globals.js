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
import Dropdown from '../components/common/Dropdown'

import { insertGlobal } from '../api/api'


export default class Globals extends Component {
	state = {
		showModal: false,
		newGlobal: {
			fk_compound: '',
			fk_solvent: '',
			fk_column: '',
			kw_slope: '',
			kw_intercept: '',
			s_slope: '',
			s_intercept: '',
		},
	}

	addNewGlobal = async () => {
		this.onChange('showModal')(false)
		await insertGlobal(this.state.newGlobal)
		await this.props.reFetchData()
	}

	onChange = prop => value => {
		this.setState({ [prop]: value })
	}

	onChangeGlobal = prop => value => {
		this.setState({
			newGlobal: {
				...this.state.newGlobal,
				[prop]: value
			}
		})
	}

	render() {

		let { showModal, newGlobal } = this.state
		let { globals, columns, compounds, solvents, onSortBy, lastSort, sortOrder } = this.props

		let valid_kwSlope = !!(newGlobal.kw_slope && !isNaN(+newGlobal.kw_slope))
		let valid_kwIntercept = !!(newGlobal.kw_intercept && !isNaN(+newGlobal.kw_intercept))
		let valid_sSlope = !!(newGlobal.s_slope && !isNaN(+newGlobal.s_slope))
		let valid_sIntercept = !!(newGlobal.s_intercept && !isNaN(+newGlobal.s_intercept))

		return (
			<>
				<Table>
					<thead className='bg-white sticky-top'>
						<tr className='d-flex align-content-around'>
							<SortTableHead className='col' onClick={onSortBy} sortParam='columnName' lastSort={lastSort} sortOrder={sortOrder} > Säule </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='compoundName' lastSort={lastSort} sortOrder={sortOrder} > Analyt </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='solventName' lastSort={lastSort} sortOrder={sortOrder} > Laufmittel </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='kw_slope' lastSort={lastSort} sortOrder={sortOrder} > m(kw) </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='kw_intercept' lastSort={lastSort} sortOrder={sortOrder} > n(kw) </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='s_slope' lastSort={lastSort} sortOrder={sortOrder} > m(s) </SortTableHead>
							<SortTableHead className='col' onClick={onSortBy} sortParam='s_intercept' lastSort={lastSort} sortOrder={sortOrder} > n(s) </SortTableHead>
							<th className=''><Button className='btn-sm ' semantic='secondary' outline={true} onClick={() => this.onChange('showModal')(true)} > + </Button> </th>
						</tr>
					</thead>
					<tbody>
						{
							globals.map((c, i) => (
								<tr key={i} className='d-flex align-content-around'>
									<td className='col'>{c.columnName}</td>
									<td className='col'>{c.compoundName}</td>
									<td className='col'>{c.solventName}</td>
									<td className='col'>{c.kw_slope}</td>
									<td className='col'>{c.kw_intercept}</td>
									<td className='col'>{c.s_slope}</td>
									<td className='col'>{c.s_intercept}</td>
									<td className=''><Button className='btn-sm border-0' semantic='light' outline={true} disabled={true} onClick={() => console.log('nothing to see here!')} ></Button> </td>
								</tr>
							))
						}
					</tbody>
				</Table>

				<Modal active={showModal} >
					<ModalHeader onCancel={() => this.onChange('showModal')(false)}>
						<h5>Neue Daten hinzufügen: </h5>
					</ModalHeader>
					<ModalBody>
						<div className='form-group col-12'>
							<label>Säule:</label>
							<Dropdown property={'Säule'} options={columns.map(c => ({ name: c.name, value: '' + c.pk_column, disabled: false }))} onChange={e => this.onChangeGlobal('fk_column')(e.target.value)} callToActionMsg='Säule wählen' />
						</div>
						<div className='form-group col-12'>
							<label>Laufmittel:</label>
							<Dropdown property={'Laufmittel'} options={solvents.map(c => ({ name: c.name, value: '' + c.pk_solvent, disabled: false }))} onChange={e => this.onChangeGlobal('fk_solvent')(e.target.value)} callToActionMsg='Laufmittel wählen' />
						</div>
						<div className='form-group col-12'>
							<label>Analyt:</label>
							<Dropdown property={'Analyt'} options={compounds.map(c => ({ name: c.name, value: '' + c.pk_compound, disabled: false }))} onChange={e => this.onChangeGlobal('fk_compound')(e.target.value)} callToActionMsg='Analyt wählen' />
						</div>
						<div className='form-group col-12'>
							<label>Steigung kw:</label>
							<Form value={'' + newGlobal.kw_slope ? newGlobal.kw_slope : ''} type='text' onChange={(e) => this.onChangeGlobal('kw_slope')(e.target.value)} isValid={valid_kwSlope} />
						</div>
						<div className='form-group col-12'>
							<label>Ordinatenschnittpunkt kw:</label>
							<Form value={'' + newGlobal.kw_intercept ? newGlobal.kw_intercept : ''} type='text' onChange={(e) => this.onChangeGlobal('kw_intercept')(e.target.value)} isValid={valid_kwIntercept} />
						</div>
						<div className='form-group col-12'>
							<label>Steigung S:</label>
							<Form value={'' + newGlobal.s_slope ? newGlobal.s_slope : ''} type='text' onChange={(e) => this.onChangeGlobal('s_slope')(e.target.value)} isValid={valid_sSlope} />
						</div>
						<div className='form-group col-12'>
							<label>Ordinatenschnittpunkt S:</label>
							<Form value={'' + newGlobal.s_intercept ? newGlobal.s_intercept : ''} type='text' onChange={(e) => this.onChangeGlobal('s_intercept')(e.target.value)} isValid={valid_sIntercept} />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button className='col-6' onClick={() => this.onChange('showModal')(false)} semantic='secondary' > Abbrechen </Button>
						<Button className='col-6' onClick={() => this.addNewGlobal()} semantic='success' outline={true}
							disabled={!(newGlobal.fk_solvent && newGlobal.fk_column && newGlobal.fk_compound && valid_kwSlope && valid_kwIntercept && valid_sSlope && valid_sIntercept)}
						>
							Hinzufügen
						</Button>
					</ModalFooter>
				</Modal>
			</>
		)
	}
}

Globals.propTypes = {
	globals: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.object),
	compounds: PropTypes.arrayOf(PropTypes.object),
	solvents: PropTypes.arrayOf(PropTypes.object),
	onSortBy: PropTypes.func.isRequired,
	lastSort: PropTypes.string,
	sortOrder: PropTypes.number,
	reFetchData: PropTypes.func.isRequired,
}
