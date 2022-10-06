import React, { useState, useEffect } from 'react';
import { IconArrowLine } from '../elements/Icons';
import Breadcrumb from '../breadcrumb';
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
		}).then((data) => {
			console.log('portfolio data', data)
			console.log('object', data.flat())
			setOgData(data)
			const pathName = window.location.pathname.replace('/', '')
			if (pathName.length > 0) {
				let pathPortfolio = findPortfolioData(data, pathName)
				console.log('pathPortfolio', pathPortfolio)
				setPortfolio(pathPortfolio)
				handleBreadcrumb(pathPortfolio[0].title)
				setActiveSec([pathPortfolio[0].title])
			} else {
				setPortfolio(data)
			}
		})
		setTimeout(() => {
			setFadeInAnim(false)
		}, 1000)
		console.log('window', window.location.pathname)
	}, [])

	const toggleSection = (title) => {
		if (activeSec.indexOf(title) > -1) {
			let filteredSec = activeSec.filter((item) => item !== title)
			setActiveSec(filteredSec)
		} else {
			setActiveSec([title, ...activeSec])
		}
	}

	const setNewPortfolio = (arr, isHome) => {
		console.log('arr', arr)
		let portfolio = arr[0]
		console.log('portfolio', portfolio)
		setPortfolio(arr)
		setActiveSec(isHome ? [''] : [portfolio.title])
		handleBreadcrumb(isHome ? 'Home' : portfolio.title)
		setFadeInAnim(true)
		setTimeout(() => {
			setFadeInAnim(false)
		}, 400)
		window.history.pushState({},"", isHome ? '/' : portfolio.title.toLowerCase());

		findPortfolioData(arr, portfolio.title)
	}

	const handleBreadcrumb = (title) => {
		// console.log('crumb title', title)
		let titleIndex = breadcrumb.indexOf(title)
		// console.log('titleIndex', titleIndex)
		if (titleIndex === -1) {
			setBreadcrumb([...breadcrumb, title])
		} else if (titleIndex + 1 < breadcrumb.length) {
			breadcrumb.splice(titleIndex + 1, breadcrumb.length - (titleIndex + 1))
			// console.log('breadcrumbe', breadcrumb)
			setBreadcrumb(breadcrumb)
			// let filteredSet = breadcrumb.filter(item => item !== title)
			// setBreadcrumb(filteredSet)
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
							<div className={`portfolio__circle ${isActivePortfolio ? 'active' : ''}`} onClick={() => setNewPortfolio([obj])}>
								<span></span>
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
						{obj.info ? <p className="text-base">{obj.info}</p> : obj.title === 'Age' ? renderAge('May 15, 1994') : ''}
					</div>
				}
			</div>
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

	const handleBreadcrumbSet = (title) => {
		console.log('title i', title)
		console.log('ogData i', ogData)
		if (title === 'Home') {
			setNewPortfolio(ogData, true)
		} else {
			let itemPortfolio = findPortfolioData(ogData, title)
			// console.log('itemPortfolio', itemPortfolio)
			setNewPortfolio(itemPortfolio)
		}
	}

	const findPortfolioData = (arr, title) => {
		let titleLowerCase = title.toLowerCase()
		// console.log('title', title)
		console.log('arr', arr)
		for (let obj of arr) {
			console.log('obj', obj)
			let filteredObj
			if (obj.title.toLowerCase() === titleLowerCase) {
				filteredObj = [obj]
			} else {
				filteredObj = obj.data.filter(item => item.title.toLowerCase() === titleLowerCase)
			}
			if (filteredObj && filteredObj.length > 0) {
				console.log('obj a', obj.title)
				// handleBreadcrumb(obj.title)
				return filteredObj
			} else {
				console.log('obj b', obj.title)
				// handleBreadcrumb(obj.title)
				return findPortfolioData(obj.data, title)
			}
		}
	}

	return (
		<>
			<Breadcrumb breadcrumb={breadcrumb} handleBreadcrumbSet={handleBreadcrumbSet} />
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