import React from 'react'
import PropTypes from 'prop-types'

import { NavLink, BrowserRouter as Router } from 'react-router-dom'

import Database from '../../database/Database'

const UI = () => (
	<>
		<Router>

			<header className='d-flex flex-column h-100'>
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
					<a className='navbar-brand text-light' href='/'>HPLC-Simulator</a>
					<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse'>
						<ul className='navbar-nav mr-auto'>
							{/* <li className='nav-item'>
								<NavLink className='nav-link' activeClassName='selected' to='/'>
									Home
								</NavLink>
							</li> */}
							<li className='nav-item'>
								<NavLink className='nav-link' activeClassName='selected' to='/database'>
									Datenbank
								</NavLink>
							</li>
						</ul>
					</div>
				</nav>

			</header>
			<div className='container-fluid bg-light'>
				{/* <Route path='/database' component={() => <Database />} /> */}
				<Database />
			</div>
			<footer className='footer mt-auto py-3 fixed-bottom bg-light' >
				<div className='container'>
					<span className='text-muted'> IT'S A TRAP!</span>
				</div>
			</footer>
		</Router>
	</>
)

UI.propTypes = {
}

export default UI