import React, { useState } from 'react'
import Sidebar from './components/sidebar'
import Portfolio from './components/portfolio'
import Breadcrumb from './components/breadcrumb'
import Navigation from './components/navigation'
import './App.scss'
import './global.scss'

const App = () => {
	const [appTheme, setAppTheme] = useState('Dark')
	const [sidebarState, setSidebarState] = useState('open')

	const toggleSidebarHandler = sidebarState => {
		if (sidebarState === 'open') {
			setSidebarState('close')
		} else {
			setSidebarState('open')
		}
	}

	const changeThemeHandler = theme => {
		setAppTheme(theme)
	}
	
  return (
    <main className="app" data-app-theme={appTheme} data-sidebar-toggle={sidebarState}>
			<Sidebar sidebarState={sidebarState} toggleSidebar={(state) => toggleSidebarHandler(state)} />
			<div className="app__body">
				<Navigation appTheme={appTheme} changeTheme={(theme) => changeThemeHandler(theme)} />
				<Breadcrumb />
				<Portfolio />
			</div>
    </main>
  );
}

export default App;
