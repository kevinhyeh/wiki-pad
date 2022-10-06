import React, { useState, useEffect } from 'react';
import { IconArrowLine } from '../elements/Icons';
import './Breadcrumb.scss';

const Breadcrumb = (props) => {
	const handleBreadcrumbClick = (title) => {
		let pathName = title === 'Home' ? '' : title.toLowerCase()
		window.history.pushState({},"", pathName);
		props.handleBreadcrumbSet(title)
	}
	return (
		<section className="breadcrumb">
			{props.breadcrumb ? props.breadcrumb.map((item, index) => {
				return(
					<React.Fragment key={index}>
						<span onClick={() => handleBreadcrumbClick(item)} className="breadcrumb__link text-xs">{item}</span>
						{index + 1 < props.breadcrumb.length ? <IconArrowLine direction="right" /> : ''}
					</React.Fragment>
				)
			}) : ''}
		</section>
	)
}

export default Breadcrumb