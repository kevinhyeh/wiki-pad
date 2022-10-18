import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { IconArrowLine } from '../elements/Icons';
import { ClockRotate, FolderExpand, OldNewBanner, GearsRotate, BellWiggle, PlugAndPlay } from '../elements/Animations.js';
import Experience from '../experience';
import Timeline from '../timeline';
import About from '../about';
import Navigation from '../navigation';
import './Portfolio.scss';

const components = {
	ClockRotate,
	FolderExpand,
	OldNewBanner,
	GearsRotate,
	BellWiggle,
	PlugAndPlay,
	Experience,
	Timeline,
	About
}

const Portfolio = (props) => {
	const activeSec = props.activeSec
	const portfolio = props.portfolio

	const toggleSection = (title) => {
		props.handleActiveSec(title)
	}


	const renderSection = (obj, index, isNotFirst) => {
		let isActiveSec = activeSec.indexOf(obj.title) > -1
		let isActivePortfolio = portfolio.length === 1 && portfolio[0].title === obj.title
		return (
			<React.Fragment key={index}>
				{obj.data ? 	
					<>
						<div className={`portfolio__header ${!isNotFirst && (activeSec[0] === '') ? 'slide-in' : 'show'}`}>
							<div className={`portfolio__circle ${isActivePortfolio ? 'active' : ''}`} onClick={isActivePortfolio ? undefined : () => props.handlePortfolioClick(obj.title)}>
								<span className={`${isActivePortfolio ? '' : 'pulsing'}`}></span>
							</div>
							<div onClick={() => toggleSection(obj.title)} className={`portfolio__header--title ${isActiveSec ? 'active' : ''}`}>
								<IconArrowLine direction="right" />
								{isNotFirst ? <h2 className="text-xl">{obj.title}</h2> : <h2 className="text-2xl">{obj.title}</h2>}
								{obj.duration && isActiveSec  ? <span className={`fade-in${isNotFirst ? " text-lg" : " text-xl"}`}>({obj.duration})</span> : ''}
							</div>
						</div>
						<div className={`portfolio__submenu ${isActiveSec ? 'active' : ''}`}>
							{obj.data ? obj.data.map((childObj, index) => (
								renderSection(childObj, index, true)
							)) : '' }
						</div>
					</>
				:
					<div key={index} className="portfolio__info">
						{obj.title ? <h4 className="text-lg">{obj.title}</h4> : ''}
						{obj.link ? 
							<a href={obj.link} target="_blank" rel="noreferrer" className="portfolio__info--link">
								{renderInfo(obj)}
							</a> : 
							obj.content ? renderContent(obj) :
							renderInfo(obj)
						}
					</div>
				}
			</React.Fragment>
		)
	}

	const renderContent = (obj) => {
		let ModuleComponent = components[obj.component]
		return (
			<>
				{obj.component ? 
					<ModuleComponent data={obj.content} activeSec={activeSec} animate={props.animationState} /> : 
					<div className={`portfolio__content fade-in`} data-tab={obj.title}>
						{obj.content ? obj.content.map((content, index) => 
							<div key={index}>
								{content.title ? <p className="text-base">{content.title}</p> : ''}
								{content.icons ?
									<div className="portfolio__icons">
										{content.icons.map((icon, index) => (
											<div className="portfolio__icon" key={index}>
												<img src={window.location.origin + '/icons/' + icon.replace(' ', '-').toLowerCase() + '.png'} alt={icon} />
												<p className="text-base text-center">{icon}</p>
											</div>
										))}
									</div>
								: ''}
								{renderInfo(content)}
							</div>) 
						: ''}
					</div>
				}
			</>
		)
	}

	const renderInfo = (obj) => {
		let IconComponent = components[obj.icon]
		return (
			<>
				{obj.subtitle ? <h5 className="text-base">{obj.subtitle}:</h5> : ''}
				{obj.icon ? <div className="portfolio__icon portfolio__icon--animation"><IconComponent animate={props.animationState} /></div> : ''}
				{obj.info ? renderText(obj.info) : ''}
				{obj.image ? renderImage(obj) : ''}
			</>
		)
	}

	const renderText = (info) => {
		info = info.replaceAll("<a", '<a target="_blank"')
		if (info.indexOf('<wiki') > -1) {
			info = info.replaceAll("<wiki data-link='", "<a href='")
			info = info.replaceAll("'>", window.location.search + "'>")
			info = info.replaceAll("</wiki>", '</a>')
		}
		if (info.indexOf('<bold>') > -1) {
			info = info.replaceAll("<bold>", "<span class='bold'>")
			info = info.replaceAll("</bold>", "</span>")
		}
		return (
			<p className="text-base">{ReactHtmlParser(info)}</p>
		)
	}

	const renderImage = (obj) => {
		return (
			 <img className="portfolio__image" src={window.location.origin + '/images/' + obj.image} alt={obj.title} />
		)
	}

	return (
		<section className="portfolio">
			<Navigation breadcrumb={props.breadcrumb} handlePortfolioClick={props.handlePortfolioClick} />
			{props.portfolio ?		
				<>
					{props.appStatus.message ? 
						<div className={`portfolio__status text-xs ${props.appStatus.status}`}><span onClick={() => props.removeStatus()}>&#215;</span>{props.appStatus.message}</div> : ''
					}
					<div className={`${props.fadeInAnim ? 'fade-in' : ''}`}>
						{props.portfolio.map((obj, index) => (
							renderSection(obj, index, false)
						))}
					</div> 
				</>
			: <></> }
		</section>
	)
}

export default Portfolio