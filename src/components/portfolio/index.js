import React, { useState, useEffect } from 'react';
import { IconArrowLine } from '../elements/Icons';
import './Portfolio.scss';

const Portfolio = (props) => {
	const [portfolio, setPortfolio] = useState([])
	const [activeSec, setActiveSec] = useState([])

	useEffect(() => {
		fetch('https://portfolio-v2-2237f-default-rtdb.firebaseio.com/portfolio.json'
		).then((response) => {
			return response.json()
		}).then((data) => {
			console.log('portfolio data', data)
			setPortfolio(data)
			console.log('portfolio', portfolio)
		})
	}, [])

	const toggleSection = (title) => {
		if (activeSec.indexOf(title) > -1) {
			let filteredSec = activeSec.filter((item) => item !== title)
			setActiveSec(filteredSec)
		} else {
			setActiveSec([title, ...activeSec])
		}
	}

	const renderSection = (obj, index) => {
		return (
			<div key={index}>
				{obj.data ? 	
					<>
						<div onClick={() => toggleSection(obj.title)} className="portfolio__header">
							<span><IconArrowLine direction="right" /></span>
							<span></span>
							<h2 className="text-xl">{obj.title}</h2>
						</div>
						<div className={`portfolio__submenu ${activeSec.indexOf(obj.title) > -1 ? 'active' : ''}`}>
							{obj.data.map((childObj, index) => (
								renderSection(childObj, index)
							))}
						</div>
					</>
				: 
					<div key={index} className="portfolio__info">
						{obj.title ? <h3 className="text-lg">{obj.title}</h3> : ''}
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
		<section className="portfolio">
			{portfolio ? portfolio.map((obj, index) => (
					renderSection(obj, index)
				)) : ''
			}
		</section>
	)
}

export default Portfolio