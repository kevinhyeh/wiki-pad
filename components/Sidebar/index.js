import React, { useState, useEffect } from 'react'
import { IconArrowLine, Folder } from '../elements/Icons' 
import './Sidebar.scss'

const Sidebar = (props) => {
	const [navList, setNavList] = useState([])
	// const [subLinksDropdownObj, setSubLinksDropdownObj] = useState({})

	useEffect(() => {
		if (props.data) {
			setNavList(props.data)
		}
	}, [])

	// const storeSublistToggleStateHandler = (data) => {
	// 	let object = {}
	// 	for (let i = 0; i < data.length; i++) {
	// 		object[data[i].title.toLowerCase() + 'Sublinks'] = 'close'
	// 	}
	// 	setSubLinksDropdownObj(object)
	// }

	// const openSubLinksHandler = (title) => {
	// 	if (subLinksDropdownObj[title.toLowerCase() + 'Sublinks'] === 'open') {
	// 		setSubLinksDropdownObj(prevState => ({
	// 			...prevState,
	// 			[title.toLowerCase() + 'Sublinks']: 'close'
	// 		}))
	// 	} else {
	// 		setSubLinksDropdownObj(prevState => ({
	// 			...prevState,
	// 			[title.toLowerCase() + 'Sublinks']: 'open'
	// 		}))
	// 	}
	// }

	const displaySidebarList = (listArr, parent)=> {
		return (
			<>
				{listArr ? listArr.map((obj, index) => {
					let active = ''
					if (props.activeSec.includes(obj.title) || (props.activeSec[0] === '' && parent)) {
						active = ' active'
					}
					return (
						// <li key={index} data-sublist-toggle={subLinksDropdownObj[listArr[i].title.toLowerCase() + 'Sublinks']}>
						<li key={index} className={`${active}`}>
							<span onClick={() => props.handleSidebarClick(obj.title)}>
								<Folder />
								{obj.title ? obj.title : ''}
							</span>
							{/* <a href="">{obj.title}</a> */}
							{obj.data && obj.data.length > 0 && obj.data[0].data ?
								<ul className="sidebar__sublist">
									{displaySidebarList(obj.data, false)}
								</ul> : 
								''
							}
						</li>
					)
				}) : ''}
			</>
		)
	}

	return (
		<section className="sidebar" data-sidebar-toggle={props.sidebarState}>
			<div className="sidebar__container">
				<button className="sidebar__collapse" onClick={() => props.toggleSidebar(props.sidebarState)}><IconArrowLine direction="left" /></button>
				<h1 className="sidebar__header text-xl">Kevin's Wiki Pad</h1>
				<ul className="sidebar__list">
					{displaySidebarList(navList, true)}
				</ul>
			</div>
		</section>
	)
}

export default Sidebar