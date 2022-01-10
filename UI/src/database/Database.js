import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom'

import Columns from './Columns'
import TabLink from './TabLink'

import { fetchData } from '../api/api'
import Compounds from './Compounds'
import Solvents from './Solvents'
import Globals from './Globals'
import Form from '../components/common/Form'

export default class Database extends Component {
	state = {
		view: '',
		search: '',

		tabs: [
			{ name: 'Säulen', tab: 'columns', path: 'columns' },
			{ name: 'Laufmittel', tab: 'solvents', path: 'solvents' },
			{ name: 'Analyten', tab: 'compounds', path: 'compounds' },
			{ name: 'Globals', tab: 'globals', path: 'globals' },
		]
	}

	onSetTab = async tab => {
		await this.setState({ view: tab, lastSort: '', newRow: {} })
	}

	componentDidMount = async () => {
		this.reFetchData()
	}

	reFetchData = async () => {
		let { compounds, columns, solvents, globals } = await fetchData()
		this.setState({ compounds, columns, solvents, globals, all: { compounds, columns, solvents, globals } })
	}

	onSortBy = async (prop) => {
		let { view } = this.state

		if (this.state.lastSort === prop) await this.setState({ sortOrder: this.state.sortOrder * -1 })
		else await this.setState({ lastSort: prop, sortOrder: 1 })

		this.setState({
			[view]: this.state[view].sort((a, b) => {
				let x = a[prop] ? (typeof a[prop] === 'string' ? a[prop].toUpperCase() : a[prop]) : ' '
				let y = b[prop] ? (typeof b[prop] === 'string' ? b[prop].toUpperCase() : b[prop]) : ' '
				return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * this.state.sortOrder
			})
		})
	}

	onChange = value => {
		this.setState({ search: value }, () => this.filterTable())
	}

	filterTable = () => {
		let { all, search } = this.state
		let rows = all[this.state.view].filter(r => Database.filterbyPattern(r, search))

		this.setState({ [this.state.view]: rows })
	}

	static filterbyPattern({ name, solventName, compoundName, columnName }, pattern) {
		const matchers = [name, solventName, compoundName, columnName]
		const matchProp = p => ('' + p).toLowerCase().includes('' + pattern.toLowerCase())
		return !pattern || !!matchers.find(matchProp)
	}

	render() {
		let { columns, compounds, solvents, globals, lastSort, sortOrder } = this.state
		return (
			<>
				<h2>Datenbank</h2>
				<ul className='nav nav-tabs '>
					<div className='col row'>
						{
							this.state.tabs.map((t, i) => (
								<TabLink key={i} currentTab={this.state.view} tab={t.tab} onClick={this.onSetTab} path={`/database/${t.path}`} >
									{t.name}
								</TabLink>
							))
						}
					</div>
					<div className='col-2 d-flex justify-content-end'>
						<Form value={'' + this.state.search} placeholder='Suche' type='search' onChange={e => this.onChange(e.target.value)} />
					</div>
				</ul>


				<Route path='/database/columns' component={() => <Columns columns={columns} onSortBy={this.onSortBy} lastSort={lastSort} sortOrder={sortOrder} reFetchData={this.reFetchData}  />} />
				<Route path='/database/compounds' component={() => <Compounds compounds={compounds} onSortBy={this.onSortBy} lastSort={lastSort} sortOrder={sortOrder} reFetchData={this.reFetchData}  />} />
				<Route path='/database/solvents' component={() => <Solvents solvents={solvents} onSortBy={this.onSortBy} lastSort={lastSort} sortOrder={sortOrder}  reFetchData={this.reFetchData} />} />
				<Route path='/database/globals' component={() => <Globals globals={globals} columns={columns} solvents={solvents} compounds={compounds} onSortBy={this.onSortBy} lastSort={lastSort} sortOrder={sortOrder} reFetchData={this.reFetchData} />} />

			</>
		)
	}
}

Database.propTypes = {

}