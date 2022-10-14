import React, { useState, useEffect } from 'react'
import Sidebar from './components/sidebar'
import Portfolio from './components/portfolio'
import Settings from './components/settings'
import './App.scss'
import './global.scss'

const App = () => {
	const [animationState, setAnimationState] = useState(true)
	const [appTheme, setAppTheme] = useState('Dark')
	const [sidebarState, setSidebarState] = useState('open')

	useEffect(() => {
		if (window.location.search) {
			filterUrlParams()
		}
	}, [])
	
	const filterUrlParams = () => {
		let currentParams = window.location.search
		let paramsArr = currentParams.slice(1, currentParams.length).split('&')
		for (let param of paramsArr) {
			if (param.includes('theme')) {
				let theme = param.replace('theme=', '')
				theme = theme.charAt(0).toUpperCase() + theme.slice(1)
				setAppTheme(theme)
			}
		}
	}

	const toggleSidebarHandler = sidebarState => {
		if (sidebarState === 'open') {
			setSidebarState('close')
		} else {
			setSidebarState('open')
		}
	}

	const changeThemeHandler = theme => {
		let currentParams = window.location.search
		let paramsArr = []
		let newParams = ''
		let themeParam = 'theme=' + theme.toLowerCase()
		if (currentParams.includes('theme=')) {
			paramsArr = currentParams.slice(1, currentParams.length).split('&')
			for (let i = 0; i < paramsArr.length; i++) {
				let param = paramsArr[i]
				if (param.includes('theme')) {
					paramsArr[i] = themeParam
				}
			}
			console.log('paramsArr', paramsArr)
		} else {
			paramsArr.push(themeParam)
		}
		newParams = '?' + paramsArr.join('')
		setAppTheme(theme)
		window.history.pushState({},"", window.location.pathname + newParams)
	}

	const toggleAnimations = () => {
		setAnimationState(!animationState)
		// console.log('animationState', animationState)
	}
	
  return (
    <main className="app" data-app-theme={appTheme} data-sidebar-toggle={sidebarState}>
			<Sidebar sidebarState={sidebarState} toggleSidebar={(state) => toggleSidebarHandler(state)} />
			<div className="app__body">
				<Settings appTheme={appTheme} changeTheme={changeThemeHandler} animationState={animationState} toggleAnimations={(state) => toggleAnimations(state)} />
				<Portfolio animationState={animationState} />
			</div>
    </main>
  );
}

export default App;
