import React, { useState } from 'react';
import './About.scss';

const About = (props) => {
	const [animate, setAnimate] = useState(false)
	const obj = props.data[0]

	setTimeout(() => {
		setAnimate(props.animate && props.activeSec.includes('About'))
	}, 300)

	const renderAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
		let timeBetween = today.getTime() - birthDate.getTime()
		let numberOfDays = (timeBetween / (1000 * 3600 * 24) - 10)
		let years = Math.floor(numberOfDays / 365)
    let months = Math.floor(numberOfDays % 365 / 30)
    let days = Math.floor(numberOfDays % 365 % 30)
    return <p className="text-base m0"><span className="bold">{years} years</span> {months} months {days} {days === 1 ? 'day' : 'days'} <span className="bold">old</span></p>;
	}

	const handleYearsDiff = (dateString) => {
		let today = new Date();
    let date = new Date(dateString);
		let timeBetween = today.getTime() - date.getTime()
		let numberOfDays = (timeBetween / (1000 * 3600 * 24) - 10)
		let years = Math.floor(numberOfDays / 365)
		return years
	}

	const aboutInfoArr = obj.info.split('<b />')

	return (
		<section className="about">
			<div className="about__container">
				<div className="profile">
					<div className="profile__card profile__card--front">
						<img src={props.homeUrl + '/images/profile-pic.png'} alt="Profile Front" />
					</div>
					<div className="profile__card profile__card--back">
						<img src={props.homeUrl + '/images/profile-image.png'} alt="Profile Back" />
					</div>
				</div>
				<div className="about__info">
					<h5 className="about__header bold">{obj.name}</h5>
					<p className="about__title text-base">{obj.title}</p>
					{obj.banner ? 
						<div className={`about__banner${animate ? ' animate' : ''}`}>
							{obj.banner.map((item, index) => (
								<h5 className="about__header bold" key={index}>{item}</h5>
							))}
							<p className="about__header--placeholder bold">{obj.banner[obj.banner.length - 1]}</p>
						</div>
					: ""}
					{renderAge('May 17, 1994')}
					<p className="text-base m0">{obj.location}</p>
				</div>
			</div>
			{aboutInfoArr ? aboutInfoArr.map((string, index) => (
				<p className="about__bio text-base" key={index}>{string.replace('<career />', handleYearsDiff('May 20, 2018'))}</p>
			)) : ''}
		</section>
	)
}

export default About