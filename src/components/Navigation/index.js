import React from 'react';
import { IconArrowLine } from '../elements/Icons';
import './Navigation.scss';

const Navigation = (props) => {
	return (
		<section className="navigation">
			{props.breadcrumb ? props.breadcrumb.map((item, index) => {
				return(
					<React.Fragment key={index}>
						<span onClick={() => props.handlePortfolioClick(item, 'breadcrumb')} className="navigation__link text-xs">{item}</span>
						{index + 1 < props.breadcrumb.length ? <IconArrowLine direction="right" /> : ''}
					</React.Fragment>
				)
			}) : ''}
		</section>
	)
}

export default Navigation