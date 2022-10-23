import React, { useState, useEffect } from 'react'
import Sidebar from './components/sidebar'
import Portfolio from './components/portfolio'
import Settings from './components/settings'
import fbDataJson from './firebase_data.json'
import './App.scss'
import './global.scss'

const App = () => {
	const [isMobile, setIsMobile] = useState()
	const [isTablet, setIsTablet] = useState()
	const [fbData, setFbData] = useState([])
	const [animationState, setAnimationState] = useState(true)
	const [appTheme, setAppTheme] = useState('Dark')
	const [sidebarState, setSidebarState] = useState('open')
	const [breadcrumb, setBreadcrumb] = useState(['Home'])
	const [appStatus, setAppStatus] = useState('')
	const [fadeInAnim, setFadeInAnim] = useState(false)
	const [portfolio, setPortfolio] = useState([])
	const [activeSec, setActiveSec] = useState(['Profile', 'About'])

	const windowPathName = window.location.pathname
	const newWindowPathName = windowPathName[windowPathName.length - 1] === '/' ? windowPathName.slice(0, -1) : windowPathName

	useEffect(() => {
		fetch('https://portfolio-v2-2237f-default-rtdb.firebaseio.com/portfolio.json'
		).then((response) => {
			return response.json()
		}).then(async(data) => {
			console.log('data', data)
			setFbData(data)
			const pathName = window.location.search.split('&')[0].replace('?', '').replace('/', '').replaceAll('-', ' ')
			if (pathName.length > 0) {
				let idName = pathName.replace('id=', '').replaceAll('%20', ' ')
				let pathPortfolio = await findPortfolioData(data, idName)
				if (pathPortfolio) {
					setPortfolio(pathPortfolio)
					setActiveSec([pathPortfolio[0].title])
				} else {
					setAppStatus({ message: 'Page Not Found', status: 'error'})
					setPortfolio(data)
					window.history.pushState({},"", '/wiki-pad')
				}
			} else {
				setPortfolio(data)
			}
			setTimeout(() => {
				setFadeInAnim(false)
			}, 5000)
		}).catch((error) => {
			console.log('error', error)
			setFbData(fbDataJson.portfolio)
			setPortfolio(fbDataJson.portfolio)
		})
		if (window.location.search) {
			filterUrlParams()
		}
		function handleResize() {
			if (window.innerWidth <= 1020) {
				setSidebarState('close')
			} else {
				setSidebarState('open')
			}
			if (window.innerWidth <= 780) {
				setIsTablet(true)
			} else {
				setIsTablet(false)
			}
			if (window.innerWidth <= 500) {
				setIsMobile(true)
			} else {
				setIsMobile(false)
			}
		}
		window.addEventListener('resize', handleResize)
		handleResize()
	}, [])
	

	const handleNewPortfolio = (arr, isHome) => {
		let portfolio = arr[0]
		setPortfolio([])
		setTimeout(() => {
			setActiveSec(isHome ? [''] : [portfolio.title])
			setPortfolio(arr)
			setFadeInAnim(true)
			setTimeout(() => {
				setFadeInAnim(false)
			}, 5000)
		}, 10)
	}
	
	const handleNewUrl = (title) => {
		window.history.pushState({},"", newWindowPathName + handleParams('id', title))
	}

	const findPortfolioData = async (arr, title) => {
		let titleLowerCase = title.toLowerCase()
		let index = 0
		let filteredObj
		let titles = ['Home']

		await findObj(arr, 'obj' + index++)
		setBreadcrumb(titles)

		return filteredObj
		
		function findObj(arr, objVar) {
			for (objVar of arr) {
				if (objVar.title.toLowerCase() === titleLowerCase) {
					filteredObj = [objVar]
					console.log('found me', filteredObj)
					titles.push(objVar.title)
					return filteredObj
				}
				if (JSON.stringify(objVar).toLowerCase().indexOf('"title":"' + titleLowerCase) > -1) {
					titles.push(objVar.title)
				}
				if ((objVar.data && objVar.data.length > 0) ) {
					if (objVar.data[0].data || objVar.data[0].tabs) {
						findObj(objVar.data, 'obj' + index++)
					}
				}
			}
		}
	}
	
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

	const handleActiveSec = (title) => {
		if (activeSec.indexOf(title) > -1) {
			let filteredSec = activeSec.filter((item) => item !== title)
			setActiveSec(filteredSec)
		} else {
			setActiveSec([title, ...activeSec])
		}
	}

	const handleParams = (param, value) => {
		let currentParams = window.location.search.replace('?', '')
		let currentParamsArr = currentParams.length > 0 ? currentParams.split('&') : undefined
		console.log('currentParams', currentParams)
		console.log('param', param)
		let paramsArr = []
		let newParams = ''
		let themeParam = param + '=' + value.toLowerCase()
		if (currentParams.includes(param + '=')) {
			for (let i = 0; i < currentParamsArr.length; i++) {
				let currentParam = currentParamsArr[i]
				if (currentParam.includes(param)) {
					paramsArr[i] = themeParam
				} else {
					paramsArr[i] = currentParam
				}
			}
		} else {
			paramsArr = currentParamsArr ? [...currentParamsArr, themeParam] : [themeParam]
		}
		console.log('paramsArr', paramsArr)
		newParams = '?' + paramsArr.join('&')
		return newParams
	}

	const changeThemeHandler = theme => {
		setAppTheme(theme)
		window.history.pushState({},"", newWindowPathName + handleParams('theme', theme))
	}

	const toggleAnimations = () => {
		setAnimationState(!animationState)
	}

	const removeStatus = () => {
		setAppStatus('')
	}

	const handlePortfolioClick = async (title, location) => {
		let isHome = title === 'Home'
		if (location === 'breadcrumb') {
			formatBreadcrumb(isHome ? 'Home' : portfolio.title)
		}
		if (isHome) {
			handleNewUrl('Home')
			handleNewPortfolio(fbData, isHome)
		} else {
			let itemPortfolio = await findPortfolioData(fbData, title)
			console.log('itemPortfolio', itemPortfolio)
			handleNewUrl(itemPortfolio[0].title)
			handleNewPortfolio(itemPortfolio)
		}
	}



	const formatBreadcrumb = (title) => {
		let titleIndex = breadcrumb.indexOf(title)
		if (titleIndex === -1) {
			breadcrumb.push(title)
			setBreadcrumb(breadcrumb)
		} else if (titleIndex + 1 < breadcrumb.length) {
			breadcrumb.splice(titleIndex + 1, breadcrumb.length - (titleIndex + 1))
			setBreadcrumb(breadcrumb)
		}
	}
	
  return (
    <main className="app" data-app-theme={appTheme} data-sidebar-toggle={sidebarState}>
			{fbData && fbData.length > 0 ?
				<>
					<Sidebar sidebarState={sidebarState} toggleSidebar={(state) => toggleSidebarHandler(state)} data={fbData} breadcrumb={breadcrumb} handlePortfolioClick={handlePortfolioClick} setSidebarState={setSidebarState} isMobile={isMobile} />
					<div className={`sidebar__overlay${sidebarState === 'open' ? ' active' : ''}`} onClick={() => setSidebarState('close')}></div>
					<div className="app__body">
						<Settings appTheme={appTheme} changeTheme={changeThemeHandler} animationState={animationState} toggleAnimations={(state) => toggleAnimations(state)} />
						<Portfolio portfolio={portfolio} ogData={fbData} findPortfolioData={findPortfolioData} setBreadcrumb={setBreadcrumb} removeStatus={removeStatus} appStatus={appStatus} fadeInAnim={fadeInAnim} setFadeInAnim={setFadeInAnim} breadcrumb={breadcrumb} handleNewPortfolio={handleNewPortfolio} handleActiveSec={handleActiveSec} activeSec={activeSec} animationState={animationState} handlePortfolioClick={handlePortfolioClick} isMobile={isMobile} isTablet={isTablet} handleParams={handleParams} newWindowPathName={newWindowPathName} />
					</div>
				</>
			: ''}
    </main>
  );
}

export default App;
