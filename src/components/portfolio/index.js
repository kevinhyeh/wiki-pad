import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { IconArrowLine } from '../elements/Icons';
import Navigation from '../navigation';
import './Portfolio.scss';

const Portfolio = (props) => {
	const [ogData, setOgData] = useState()
	const [fadeInAnim, setFadeInAnim] = useState(true)
	const [portfolio, setPortfolio] = useState([])
	const [activeSec, setActiveSec] = useState([''])
	const [breadcrumb, setBreadcrumb] = useState(['Home'])

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
				console.log('pathPortfolio', pathPortfolio)
				setPortfolio(pathPortfolio)
				// formatBreadcrumb(pathPortfolio[0].title)
				setActiveSec([pathPortfolio[0].title])
			} else {
				setPortfolio(data)
			}
		})
		setTimeout(() => {
			setFadeInAnim(false)
		}, 1000)
	}, [])

	const toggleSection = (title) => {
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
			}, 400)
			setNewUrl(isHome ? '/' : portfolio.title)
		}, 10)
	}
	
	const setNewUrl = (title) => {
		let currentUrl = window.location.href
		console.log('currentUrl', currentUrl)
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

	const renderSection = (obj, index) => {
		let isActiveSec = activeSec.indexOf(obj.title) > -1
		let isActivePortfolio = portfolio.length === 1 && portfolio[0].title === obj.title
		return (
			<div key={index}>
				{obj.data ? 	
					<>
						<div className="portfolio__header">
							<div className={`portfolio__circle ${isActivePortfolio ? 'active' : ''}`} onClick={isActivePortfolio ? undefined : () => handlePortfolioClick(obj.title)}>
								<span className={`${isActivePortfolio ? '' : 'pulsing'}`}></span>
							</div>
							<div onClick={() => toggleSection(obj.title)} className={`portfolio__header--title ${isActiveSec ? 'active' : ''}`}>
								<IconArrowLine direction="right" />
								<h2 className="text-xl">{obj.title}</h2>
							</div>
						</div>
						<div className={`portfolio__submenu ${isActiveSec ? 'active' : ''}`}>
							{obj.data.map((childObj, index) => (
								renderSection(childObj, index)
							))}
						</div>
					</>
				: 
					<div key={index} className="portfolio__info">
						{obj.title ? <h3 className="text-lg">{obj.title}:</h3> : ''}
						{obj.link ? 
							<a href={obj.link} target="_blank" rel="noreferrer" className="portfolio__info--link">
								{renderContent(obj)}
							</a> :
							renderContent(obj)
						}
					</div>
				}
			</div>
		)
	}

	const renderContent = (obj) => {
		return (
			<>
				{obj.subtitle ? <h4 className="text-base">{obj.subtitle}:</h4> : ''}
				{obj.info ? renderInfo(obj.info) : obj.title === 'Age' ? renderAge('May 15, 1994') : ''}
				{obj.image ? <img className="portfolio__image" src={window.location.origin + '/images/' + obj.image} alt={obj.title} /> : ''}
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
		return (
			<p className="text-base">{ReactHtmlParser(info)}</p>
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
		}
		if (isHome) {
			handleNewPortfolio(ogData, isHome)
		} else {
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
				if (objVar.data && objVar.data.length > 0) {
					if (objVar.data[0].data) {
						findObj(objVar.data, 'obj' + index++)
					}
				}
			}
		}
	}

	return (
		<>
			<Navigation breadcrumb={breadcrumb} handlePortfolioClick={handlePortfolioClick} />
			<section className={`portfolio ${fadeInAnim ? 'fade-in' : ''}`}>
				{portfolio ? portfolio.map((obj, index) => (
						renderSection(obj, index)
					)) : ''
				}
			</section>
		</>
	)
}

export default Portfolio