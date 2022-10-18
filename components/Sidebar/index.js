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
	}, [props.data])

	const displaySidebarList = (listArr, parent)=> {
		return (
			<>
				{listArr ? listArr.map((obj, index) => {
					let active = ''
					if (props.breadcrumb.includes(obj.title) || (props.breadcrumb[0] === 'Home' && parent)) {
						active = ' active'
					}
					return (
						<li key={index} className={`${active}`}>
							<span onClick={() => props.handlePortfolioClick(obj.title)}>
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