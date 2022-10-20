import React, { useRef, useState } from 'react';
import { Phone, Email, LinkedIn, Copy } from '../elements/Icons'

import './Contact.scss'

const contactComponents = {
	Phone,
	Email,
	LinkedIn
}

const ContactForm = (props) => {
	const [messageValue, setMessageValue] = useState('')
	const [copied, setCopied] = useState(false)
	const [formSuccess, setFormSuccess] = useState(false)
	const [firstName, setFirstName] = useState()
	const contactFormRef = useRef()
	
	const handleSubmit = (e) => {
		e.preventDefault()
		let name = e.target.name.value
		setFirstName(name.split(' ')[0])
		let data = new FormData(e.target);
		fetch(e.target.action, {
			method: "POST",
			body: data,
			headers: {
				'Accept': 'application/json'
			}
		}).then(response => {
			if (response.ok) {
				setFormSuccess(true)
			} else {
			}
		}).catch(error => {
			console.log('error', error)
		});
	}

	const handleTextUpdate = (e) => {
		e.preventDefault()
		let message = e.target.value
		setMessageValue(message)
	}

	const resetForm = () => {
		setFormSuccess(false)
		contactFormRef.current.reset()
		setMessageValue('')
	}

	const copyToClipboard = (string) => {
		navigator.clipboard.writeText(string)
		setCopied(true)
	}

	const animate = formSuccess ? ' animate' : ''

  return (
		<div className="contact">
			<form
				action="https://formspree.io/f/moqbndlo"
				method="POST"
				onSubmit={(e) => handleSubmit(e)}
				ref={contactFormRef}
				className={`contact__form${animate}`}
			>
				<div className="slide-up">
					<input type="" name="name" placeholder='Name' className="text-base" required />
					<input type="email" name="email" placeholder='Email' className="text-base" />
					<textarea name="message" placeholder={formSuccess ? '' : 'Message'} className="text-base" value={formSuccess ? '' : messageValue} onChange={(e) => handleTextUpdate(e)}></textarea>
					<div className={`envelope__top${animate}`}>
						<div className={`envelope__top--outer`}></div>
						<div className={`envelope__top--inner`}></div>
					</div>
				</div>
				<button className={`text-base bold tu${formSuccess ? '' : ' active'}`}>send</button>
			</form>
			<div className={`contact__message${animate}`}>
				<p className="text-xl mt0">Thanks {firstName} for the email! I will be in contact as soon as I can. :D</p>
				<button className="contact__button tu bold" onClick={() => resetForm()}>Reset Form</button>
			</div>
			<div className="contact__socials">
				{props.data ? props.data.map((obj, index) => {
					let MyComponent = contactComponents[obj.icon]
					return (
						<div className="contact__info" id={obj.icon.toLowerCase()} key={index}>
							<span className="contact__icon">
								<MyComponent />
							</span>
							<div className="contact__open">
								{(props.isMobile && obj.icon === "Phone") || obj.link ? 
									<a className="m0 contact__text text-base bold" target="_blank" rel="noreferrer" href={obj.icon === 'Phone' ? `tel:${obj.info.replaceAll('-', '')}` : obj.link}>{obj.info}</a> : 
									<p className="m0 text-base contact__text bold">{obj.info}</p>
								}
								<span className={`contact__copy${copied ? ' copied' : ''}`} onClick={() => copyToClipboard(obj.info)}>
									<Copy />
								</span>
							</div>
						</div>
					)
				}) : ''}
			</div>
		</div>
  );
}

export default ContactForm