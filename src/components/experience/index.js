import React, { useState, useEffect } from 'react';
import './Experience.scss';

const Experience = (props) => {
	const [startAnimation, setStartAnimation] = useState(false)
	useEffect(() => {
		if (props.activeSec.includes('Experience')) {
			setTimeout(() => {
				setStartAnimation(true)
			}, 10)
		} else {
			setStartAnimation(false)
		}
	}, [props.activeSec])

	return (
		<div className="experience">
			{props.data ? props.data.map((obj, index) => {
				let barWidth = obj.years * 10
				// let barWidth = obj.years >= 3 ? obj.years * 10 : 30
				barWidth = barWidth + '%'
				return (
					<div className="experience__container" key={index}>
						<div className="experience__icon">
							<img src={props.homeUrl + '/icons/' + obj.info.replace(' / ', '-').replace(' ', '-').toLowerCase() + '.png'} alt={obj.info} />
						</div>
						<div className="w-full">
							{obj.link ? 
								<a href={obj.link} target="_blank" rel="noreferrer">
									<p className="text-base bold">{obj.info}</p>
								</a> :
								<p className="text-base bold">{obj.info}</p>
							}
							<div className={`experience__bar${startAnimation ? '' : ' still'}`} style={{width: barWidth}}>
								<p className="text-base bold">
									{obj.years} {obj.years === 1 ? 'Year' : 'Years'}
								</p>
							</div>
							<p className={`text-base bold overlay${startAnimation ? '' : ' invisible'}`}>
								{obj.months ? 
									`${obj.months} ${obj.months === 1 ? 'Month' : 'Months'}`
								: ''}
								{obj.years ? 
									`${obj.years} ${obj.years === 1 ? 'Year' : 'Years'}`
								: ''}
							</p>
						</div>
					</div>
				)
			}) : ''}
		</div>
	)
}

export default Experience