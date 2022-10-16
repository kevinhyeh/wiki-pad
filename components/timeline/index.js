import React from 'react';
import './Timeline.scss';
import { HighSchool, College, Bootcamp } from '../elements/Icons'

const educationIcons = {
	HighSchool,
	College,
	Bootcamp
}

const Timeline = (props) => {
	let animate = props.activeSec.includes('Education')
	return (
		<div className={`timeline${animate ? ' animate' : ''}`}>
			{props.data ? props.data.map((obj, index) => {
				let MyComponent = educationIcons[obj.icon]
				return (
					<React.Fragment key={index}>
						<div className="timeline__icon" data-index={index + 1}>
							<MyComponent />
							<p className="text-base bold">{obj.duration}</p>
						</div>
						<div className="timeline__info" data-index={index + 1}>
							<p className="text-base bold">{obj.title}</p>
							<p className="text-base">{obj.info}</p>
						</div>
					</React.Fragment>
				)
			})
			: ''}
			<div className="timeline__line"></div>
		</div>
	)
}

export default Timeline