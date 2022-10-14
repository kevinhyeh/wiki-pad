import React from 'react';
import './Experience.scss';

const Experience = (props) => {

	return (
		<div className="experience">
			{props.data ? props.data.map((obj, index) => {
				let barWidth = obj.years * 10
				// let barWidth = obj.years >= 3 ? obj.years * 10 : 30
				barWidth = barWidth + '%'
				return (
					<div className="experience__container" key={index}>
						<img src={window.location.origin + '/icons/' + obj.info.replace(' / ', '-').replace(' ', '-').toLowerCase() + '.png'} alt={obj.info} className="experience__icon" />
						<div className="w-full">
							<p className="text-base bold">{obj.info}</p>
							<div className={`experience__bar${props.animate ? '' : ' still'}`} style={{width: barWidth}}>
								<p className="text-base bold">
									{obj.years} {obj.years === 1 ? 'Year' : 'Years'}
								</p>
							</div>
							{obj.years <= 2 ? 
								<p className={`text-base bold overlay${props.animate ? '' : ' invisible'}`}>
									{obj.years} {obj.years === 1 ? 'Year' : 'Years'}
								</p> : ''
							}
						</div>
					</div>
				)
			}) : ''}
		</div>
	)
}

export default Experience