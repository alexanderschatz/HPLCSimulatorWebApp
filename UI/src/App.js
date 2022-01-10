import React, { Component } from 'react'
// import { fetchAlerts, verifyUser } from './api/api'
// import toastr from 'toastr'

import UI from './components/ui/UI'

export default class App extends Component {
	state = {
		userVerified: false,
		alerts: [],
		user: {},
	}

	render() {

		let { alerts } = this.state

		return (
			<UI alerts={alerts} onAcknowledge={this.onToggleAlert} onFetchAlerts={this.onClick} />
		)
	}
}

