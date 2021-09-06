import React, { useState, useEffect } from 'react'
import './Sidebar.scss'

const Sidebar = (props) => {
	const [navList, setNavList] = useState([])

	useEffect(() => {
		fetch('https://portfolio-v2-2237f-default-rtdb.firebaseio.com/navigation.json'
		).then((response) => {
			return response.json()
		}).then((data) => {
			console.log('data', data)
			setNavList(data)
		})
	}, [])

	const displaySidebarList = listArr => {
		let listHtml = []
		for (let i = 0; i < listArr.length; i++) {
			listHtml.push(
				<li key={i}>
					{/* <a href="">{listArr[i].title}</a> */}
					{listArr[i].title}
					{listArr[i].sublinks && listArr[i].sublinks.length > 0 ?
					<ul className="sidebar__sublist">{displaySidebarList(listArr[i].sublinks)}</ul> : ''}
					<span className="sidebar__list--dropdown" onClick={() => {}}></span>
				</li>
			)
		}
		return listHtml
	}

	return (
		<section className="sidebar" data-sidebar-toggle={props.sidebarState}>
			<button className="sidebar__collapse" onClick={() => props.toggleSidebar(props.sidebarState)}>&#x2039;</button>
			<ul className="sidebar__list">{displaySidebarList(navList)}</ul>
		</section>
	)
}

export default Sidebar