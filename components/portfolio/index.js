import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { IconArrowLine } from '../elements/Icons';
import { ClockRotate, FolderExpand, OldNewBanner, GearsRotate, BellWiggle, PlugAndPlay } from '../elements/Animations.js';
import Experience from '../experience';
import Navigation from '../navigation';
import './Portfolio.scss';

const components = {
	ClockRotate,
	FolderExpand,
	OldNewBanner,
	GearsRotate,
	BellWiggle,
	PlugAndPlay,
	Experience
}

const Portfolio = (props) => {
	const [appStatus, setAppStatus] = useState('')
	const [prevClick, setPrevClick] = useState('')
	const [ogData, setOgData] = useState()
	const [fadeInAnim, setFadeInAnim] = useState(false)
	const [portfolio, setPortfolio] = useState([])
	const [activeSec, setActiveSec] = useState([''])
	const [breadcrumb, setBreadcrumb] = useState(['Home'])
	const [activeTab, setActiveTab] = useState('Summary')

	useEffect(() => {
		fetch('https://portfolio-v2-2237f-default-rtdb.firebaseio.com/portfolio.json'
		).then((response) => {
			return response.json()
		}).then(async (data) => {
			console.log('portfolio data', data)
			setOgData(data)
			const pathName = window.location.pathname.replace('/', '').replaceAll('-', ' ')
			if (pathName.length > 0) {
				let pathPortfolio = await findPortfolioData(data, pathName)
				if (pathPortfolio) {
					console.log('pathPortfolio', pathPortfolio)
					setPortfolio(pathPortfolio)
					// formatBreadcrumb(pathPortfolio[0].title)
					setActiveSec([pathPortfolio[0].title])
				} else {
					setAppStatus({ message: 'Page Not Found', status: 'error'})
					setPortfolio(data)
					window.history.pushState({},"", convertTitleToUrl('/') + window.location.search)
				}
			} else {
				setPortfolio(data)
			}
		})
		setTimeout(() => {
			setFadeInAnim(false)
		}, 5000)
	}, [])

	const toggleSection = (title) => {
		setPrevClick('toggle')
		if (activeSec.indexOf(title) > -1) {
			let filteredSec = activeSec.filter((item) => item !== title)
			setActiveSec(filteredSec)
		} else {
			setActiveSec([title, ...activeSec])
		}
	}

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
			handleNewUrl(isHome ? '/' : portfolio.title)
		}, 10)
	}
	
	const handleNewUrl = (title) => {
		window.history.pushState({},"", convertTitleToUrl(title) + window.location.search)
	}

	const convertTitleToUrl = (string) => {
		string = string.toLowerCase().replaceAll(' ', '-')
		return string
	}

	const formatBreadcrumb = (title) => {
		// console.log('crumb title', title)
		let titleIndex = breadcrumb.indexOf(title)
		// console.log('titleIndex', titleIndex)
		if (titleIndex === -1) {
			breadcrumb.push(title)
			setBreadcrumb(breadcrumb)
		} else if (titleIndex + 1 < breadcrumb.length) {
			breadcrumb.splice(titleIndex + 1, breadcrumb.length - (titleIndex + 1))
			setBreadcrumb(breadcrumb)
		}
	}

	const renderSection = (obj, index, isNotFirst) => {
		let isActiveSec = activeSec.indexOf(obj.title) > -1
		let isActivePortfolio = portfolio.length === 1 && portfolio[0].title === obj.title
		return (
			<React.Fragment key={index}>
				{obj.data || obj.tabs ? 	
					<>
						<div className={`portfolio__header ${!isNotFirst && (activeSec[0] === '' && prevClick === 'breadcrumb') ? 'slide-in' : 'show'}`}>
							<div className={`portfolio__circle ${isActivePortfolio ? 'active' : ''}`} onClick={isActivePortfolio ? undefined : () => handlePortfolioClick(obj.title)}>
								<span className={`${isActivePortfolio ? '' : 'pulsing'}`}></span>
							</div>
							<div onClick={() => toggleSection(obj.title)} className={`portfolio__header--title ${isActiveSec ? 'active' : ''}`}>
								<IconArrowLine direction="right" />
								{isNotFirst ? <h2 className="text-xl">{obj.title}</h2> : <h2 className="text-2xl">{obj.title}</h2>}
								{obj.duration && isActiveSec  ? <span className={`fade-in${isNotFirst ? " text-lg" : " text-xl"}`}>({obj.duration})</span> : ''}
							</div>
						</div>
						<div className={`portfolio__submenu ${isActiveSec ? 'active' : ''}`}>
							{obj.data ? obj.data.map((childObj, index) => (
								renderSection(childObj, index, true)
							)) : obj.tabs ? renderTabs(obj.tabs) : '' }
						</div>
					</>
				:
					<div key={index} className="portfolio__info">
						{obj.title ? <h4 className="text-lg">{obj.title}:</h4> : ''}
						{obj.link ? 
							<a href={obj.link} target="_blank" rel="noreferrer" className="portfolio__info--link">
								{renderContent(obj)}
							</a> :
							renderContent(obj)
						}
					</div>
				}
			</React.Fragment>
		)
	}

	const renderTabs = (arr) => {
		let tabsToRender = arr.map((obj, index) => {
			return (
				<span key={index} className={`portfolio__tab text-base${activeTab === obj.title ? ' active' : ''}`} onClick={() => handleActiveTab(obj.title)}>{obj.title ? obj.title : ''}</span>
			)
		})
		let contentToRender = arr.map((obj, index) => {
			if (activeTab === obj.title) {
				return (
					<div key={index} className={`portfolio__content fade-in`} data-tab={obj.title}>
						{obj.content ? obj.content.map((content, index) => 
							<div key={index}>
								{content.title ? <p className="text-base">{content.title}</p> : ''}
								{renderContent(content)}
							</div>) 
							: ''}
					</div>
				)
			} else {
				return null
			}
		})
		return (
			<>
				<div className={`portfolio__tabs`}>{tabsToRender}</div>
				{contentToRender}
			</>
		)

		function handleActiveTab(title) {
			setActiveTab(title)
		}
	}

	const renderContent = (obj) => {
		let IconComponent = components[obj.icon]
		let ModuleComponent = components[obj.component]
		return (
			<>
				{obj.subtitle ? <h5 className="text-base">{obj.subtitle}:</h5> : ''}
				{obj.icon ? <div className="portfolio__icon"><IconComponent animate={props.animationState} /></div> : ''}
				{obj.component ? <ModuleComponent data={obj.content} animate={activeSec[0] === 'Skills' ? true : false} /> : ''}
				{obj.info ? renderInfo(obj.info) : obj.title === 'Age' ? renderAge('May 15, 1994') : ''}
				{obj.image ? renderImage(obj) : ''}
			</>
		)
	}

	const renderInfo = (info) => {
		info = info.replaceAll("<a", '<a target="_blank"')
		if (info.indexOf('<wiki') > -1) {
			info = info.replaceAll("<wiki data-link='", "<a href='")
			info = info.replaceAll("'>", window.location.search + "'>")
			info = info.replaceAll("</wiki>", '</a>')
		}
		if (info.indexOf('<bold>') > -1) {
			info = info.replaceAll("<bold>", "<span class='bold'>")
			info = info.replaceAll("</bold>", "</span>")
		}
		// console.log('info', info)
		return (
			<p className="text-base">{ReactHtmlParser(info)}</p>
		)
	}

	const renderImage = (obj) => {
		return (
			 <img className="portfolio__image" src={window.location.origin + '/images/' + obj.image} alt={obj.title} />
		)
	}

	const renderAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return <p className="text-base">{age}</p>;
	}

	const handlePortfolioClick = async (title, location) => {
		let isHome = title === 'Home'
		if (location === 'breadcrumb') {
			formatBreadcrumb(isHome ? 'Home' : portfolio.title)
			setPrevClick(location)
		}
		if (isHome) {
			handleNewPortfolio(ogData, isHome)
		} else {
			setPrevClick('')
			console.log('prevClick', prevClick)
			let itemPortfolio = await findPortfolioData(ogData, title)
			handleNewPortfolio(itemPortfolio)
		}
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

	const removeStatus = () => {
		setAppStatus('')
	}

	return (
		<section className="portfolio">
			<Navigation breadcrumb={breadcrumb} handlePortfolioClick={handlePortfolioClick} />
			{appStatus.message ? 
			<div className={`portfolio__status text-xs ${appStatus.status}`}><span onClick={removeStatus}>&#215;</span>{appStatus.message}</div> : ''
			}
			<div className={`${fadeInAnim ? 'fade-in' : ''}`}>
				{portfolio ? portfolio.map((obj, index) => (
						renderSection(obj, index, false)
					)) : ''
				}
			</div>
		</section>
	)
}

export default Portfolio