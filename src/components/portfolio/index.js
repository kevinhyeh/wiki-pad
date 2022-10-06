import React, { useState, useEffect } from 'react';
import { IconArrowLine } from '../elements/Icons';
import Breadcrumb from '../breadcrumb';
import './Portfolio.scss';

const Portfolio = (props) => {
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
			setPortfolio(data)
			console.log('portfolio', portfolio)
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
		handleBreadcrumb(title)
	}

	const setNewPortfolio = (portfolio) => {
		setPortfolio([portfolio])
		setActiveSec([portfolio.title])
		handleBreadcrumb(portfolio.title)
		setFadeInAnim(true)
		setTimeout(() => {
			setFadeInAnim(false)
		}, 1000)
	}

	const handleBreadcrumb = (title) => {
		if (breadcrumb.indexOf(title) === -1) {
			setBreadcrumb([...breadcrumb, title])
		} else {
			let filteredSet = breadcrumb.filter(item => item !== title)
			setBreadcrumb(filteredSet)
		}
	}

	const renderSection = (obj, index) => {
		let isActive = activeSec.indexOf(obj.title) > -1
		return (
			<div key={index}>
				{obj.data ? 	
					<>
						<div className="portfolio__header">
							<div className={`portfolio__circle ${isActive ? 'active' : ''}`} onClick={isActive ? false : () => setNewPortfolio(obj)}>
								<span></span>
							</div>
							<div onClick={() => toggleSection(obj.title)} className={`portfolio__header--title ${isActive ? 'active' : ''}`}>
								<IconArrowLine direction="right" />
								<h2 className="text-xl">{obj.title}</h2>
							</div>
						</div>
						<div className={`portfolio__submenu ${isActive ? 'active' : ''}`}>
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
		console.log('birthDate', birthDate)
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return <p className="text-base">{age}</p>;
	}

	return (
		<>
			<Breadcrumb breadcrumb={breadcrumb} />
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