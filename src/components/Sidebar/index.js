import React, { useState } from 'react'
import './Sidebar.scss'

const Sidebar = () => {
	const [sidebarState, setSidebarState] = useState('open');

	const toggleSidebarHandler = sidebarState => {
		if (sidebarState === 'open') {
			setSidebarState('close')
		} else {
			setSidebarState('open')
		}
	}

	return (
		<section className="sidebar" data-panel-toggle={sidebarState}>
			<button className="sidebar__collapse" onClick={() => toggleSidebarHandler(sidebarState)}>&#x2039;</button>
			<ul className="sidebar__list"></ul>
		</section>
	)
}

export default Sidebar