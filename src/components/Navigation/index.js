import React from 'react';
import { IconArrowLine } from '../elements/Icons';
import './Navigation.scss';

const Navigation = (props) => {
	const handleNavigationClick = (title) => {
		let pathName = title === 'Home' ? '' : title.toLowerCase().replaceAll(' ', '-')
		window.history.pushState({},"", pathName);
		props.handlePortfolioClick(title, 'breadcrumb')
	}
	return (
		<section className="navigation">
			{props.breadcrumb ? props.breadcrumb.map((item, index) => {
				return(
					<React.Fragment key={index}>
						<span onClick={() => handleNavigationClick(item)} className="navigation__link text-xs">{item}</span>
						{index + 1 < props.breadcrumb.length ? <IconArrowLine direction="right" /> : ''}
					</React.Fragment>
				)
			}) : ''}
		</section>
	)
}

export default Navigation