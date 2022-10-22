import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { IconArrowLine, Animation, FullStack, Flow, FastForward, FileStorage, Layout, Transform, Github } from '../elements/Icons';
import { ClockRotate, FolderExpand, OldNewBanner, GearsRotate, BellWiggle, PlugAndPlay } from '../elements/Animations.js';
import Experience from '../experience';
import Timeline from '../timeline';
import About from '../about';
import Navigation from '../navigation';
import ContactForm from '../contact';
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
	About,
	ContactForm,
	Animation, 
	FullStack, 
	Flow, 
	FastForward, 
	FileStorage, 
	Layout, 
	Transform
}

const Portfolio = (props) => {
	const activeSec = props.activeSec
	const portfolio = props.portfolio
	// const isMobile = props.isMobile
	const isTablet = props.isTablet

	const homeUrl = "https://kevinhyeh.github.io/wiki-pad/"

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
								{obj.duration && isActiveSec && !isTablet ? <span className={`fade-in${isNotFirst ? " text-lg" : " text-xl"}`}>({obj.duration})</span> : ''}
							</div>
						</div>
						{obj.duration && isActiveSec && isTablet ? <span id="duration" className={`fade-in${isNotFirst ? " text-base" : " text-lg"}`}>({obj.duration})</span> : ''}
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
					<ModuleComponent data={obj.content} activeSec={activeSec} animate={props.animationState} isMobile={props.isMobile} homeUrl={homeUrl} /> : 
					<div className={`portfolio__content fade-in`} data-tab={obj.title}>
						{obj.content ? obj.content.map((content, index) => 
							<div key={index}>
								{content.title ? <p className="text-base">{content.title}</p> : ''}
								<div className="flex">
									{renderButton(content)}
								</div>
								{content.icons ?
									<div className="portfolio__icons">
										{content.icons.map((icon, index) => (
											<div className="portfolio__icon" key={index}>
												{renderIcon(icon)}
												<p className="text-sm text-center">{icon}</p>
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

	const renderButton = (obj) => {
		if (obj.buttons) {
			return obj.buttons.map((button, index) => {
				return (
					<React.Fragment key={index}>
						{button.title === 'Github' ?
							<a href={button.link} target="_blank" key={index} rel="noreferrer">
								<span className="portfolio__icon--link"><Github /></span>
							</a> :
							<a href={button.link} target="_blank" key={index} rel="noreferrer">
								<button className="text-base primary-button">
									{button.title}
								</button>
							</a>
						}
					</React.Fragment>
				)
			})
		} else if (obj.button) {
			return <a href={obj.link} target="_blank" rel="noreferrer"><button className="text-base primary-button">{obj.button}</button></a>
		}
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
			let wikiId = info.slice(
				info.indexOf('<wiki>'),
				info.lastIndexOf('</wiki>'),
			).replace('<wiki>', '').toLowerCase()
			let newParams = props.handleParams('id', wikiId)
			info = info.replaceAll("<wiki>", "<a href='wiki" + newParams + "'>")
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
			 <img className="portfolio__image" src={homeUrl + '/images/' + obj.title.toLowerCase()} alt={obj.title} />
		)
	}

	const renderIcon = (title) => {
		return (
			<img src={homeUrl + '/icons/' + title.replaceAll(' / ', '-').replace(' ', '-').toLowerCase() + '.png'} alt={title} />
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