import React, { useState, useEffect } from 'react';
import { IconArrowLine } from '../elements/Icons';
import './Breadcrumb.scss';

const Breadcrumb = (props) => {
	return (
		<section className="breadcrumb">
			{props.breadcrumb ? props.breadcrumb.map((item, index) => (
				<>
					<a href="" key={index} className="breadcrumb__link text-xs">{item}</a>
					{index + 1 < props.breadcrumb.length ? <IconArrowLine direction="right" /> : ''}
				</>
			)) : ''}
		</section>
	)
}

export default Breadcrumb