import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../features/theme/themeSlice'
import { IconArrowLine } from '../elements/Icons';
import './Settings.scss';

const Settings = (props) => {
	const theme = useSelector(state => state.theme.value)
	const dispatch = useDispatch()
	const [themeToggleState, setThemeToggleState] = useState('close')
	const themeSelectRef = useRef()

	const themeOptions = ['Dark', 'Light', 'Kevin']

	const toggleSelectHandler = themeToggleState => {
		if (themeToggleState === 'open') {
			setThemeToggleState('close')
		} else {
			setThemeToggleState('open')
			themeSelectRef.current.focus()
		}
	}

	console.log('theme', theme)

	return (
		<section className="settings">
			<span className="text-xs">Theme:</span>
			<div className="settings__select" data-select-toggle={themeToggleState}>
				<button className="settings__select--toggle" ref={themeSelectRef} onClick={() => toggleSelectHandler(themeToggleState)} onBlur={() => toggleSelectHandler(themeToggleState)}>
					<span>{props.appTheme}</span>
					<IconArrowLine direction="down" />
				</button>
				<ul className="settings__select--list">
					{themeOptions ? themeOptions.map((item, index) => (
						<button className="settings__select--option" key={index} onClick={() => dispatch(update(item))}>{item}</button>
					)) : <></>
					}
				</ul>
			</div>
			<span className="text-xs">Animation:</span>
			<div className="settings__toggle" onClick={() => props.toggleAnimations()}>
				<span className={`settings__toggle--slider${props.animationState ? ' clicked' : ''}`}></span>
			</div>
		</section>
	)
}

export default Settings