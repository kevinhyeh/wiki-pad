import './Icons.scss';

export const IconArrowLine = (props) => {
  let rotate;
	// let cssColor = `text-${color}`

  switch (props.direction) {
    case 'right':
      rotate = 'rotate-0';
      break;
    case 'left':
      rotate = 'rotate-180';
      break;
    case 'up':
      rotate = '-rotate-90';
      break;
    case 'down':
      rotate = 'rotate-90';
      break;
    default:
      rotate = 'rotate-0';
  }

  return (
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
			viewBox="0 0 179.5 326.2" className={`${rotate}`}>
			<g transform="translate(0.000000,357.000000) scale(0.100000,-0.100000)">
				<path d="M123.6,3566.5c-92-21-147-127-114-217c6-16,316-333,700-718l690-690l-681-680c-405-405-689-696-701-719
					c-67-130,71-280,205-222c18,8,352,335,794,778c642,643,763,769,772,801c5,21,8,44,6,50c-2,7-6,26-10,42c-5,23-193,217-763,788
					c-416,417-768,764-782,771C204.6,3568.5,159.6,3574.5,123.6,3566.5z"/>
			</g>
		</svg>
  );
}

export const Gear = () => {
	return (
		<svg enableBackground="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
			<circle cx="16" cy="16" fill="none" id="XMLID_224_" r="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
			<path d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  " fill="none" id="XMLID_242_" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
		</svg>
	)
}

export const Bell = () => {
	return (
		<svg id="Layer_1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M7.3999,47.10938H56.59326a1.50008,1.50008,0,0,0,1.5-1.49561l.00684-2.34619a26.10011,26.10011,0,0,0-22.395-25.91193V15.26221a3.70508,3.70508,0,1,0-7.41016,0v2.09961a26.15244,26.15244,0,0,0-22.38769,25.75L5.8999,45.605a1.5004,1.5004,0,0,0,1.5,1.5044Zm23.895-31.84717a.7051.7051,0,1,1,1.41016,0v1.84814c-.23364-.0061-.46649-.01709-.70117-.01709h-.00049c-.23761,0-.47241.01166-.7085.018ZM8.90723,43.12061A23.143,23.143,0,0,1,29.79144,20.20178l.00348.00037c.00867,0,.01666-.00244.02527-.00257.7193-.068,1.44708-.10632,2.18372-.10632A23.09689,23.09689,0,0,1,55.1001,43.25879l-.00244.85059H8.9043Z"/><path d="M7.3999,52.44775H56.6001a1.5,1.5,0,0,0,0-3H7.3999a1.5,1.5,0,0,0,0,3Z"/></svg>
	)
}

export const Plug = () => {
	return (
		<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55.75 55.65"><title>plug</title><path d="M56.83,14.67,47.2,24.29l-8.06-8.13L48.7,6.63a2.16,2.16,0,0,0,.62-1.5A2.12,2.12,0,0,0,47.2,3a2.1,2.1,0,0,0-1.49.62l-9.62,9.54L30.51,7.59a2.16,2.16,0,0,0-3,0L14.88,20.2a19.94,19.94,0,0,0-1.41,26.67L5.41,55a2.13,2.13,0,0,0-.51.68,2.25,2.25,0,0,0-.2.84,2,2,0,0,0,.15.84,2,2,0,0,0,.47.72,2.15,2.15,0,0,0,.71.47,2,2,0,0,0,.84.15A2.09,2.09,0,0,0,8.4,58l8.06-8.06a20,20,0,0,0,26.69-1.42L55.77,35.86a1.9,1.9,0,0,0,.46-.69,2,2,0,0,0,.17-.81,2.06,2.06,0,0,0-.17-.81,2,2,0,0,0-.46-.69l-5.56-5.57,9.62-9.62a2.12,2.12,0,0,0-1.5-3.62,2.09,2.09,0,0,0-1.5.62Z" transform="translate(-4.7 -3.02)"/></svg>
	)
}

export const Play = () => {
	return (
		<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.93 56.94"><title>play</title><path d="M58.56,4.81a2.3,2.3,0,0,0-1.64-.69,2.33,2.33,0,0,0-.9.18,2.27,2.27,0,0,0-.75.51L46.38,13.7a22.07,22.07,0,0,0-29.45,1.58L3,29.2a2.42,2.42,0,0,0-.51.76,2.34,2.34,0,0,0,0,1.8,2.42,2.42,0,0,0,.51.76L30.87,60.4a2.37,2.37,0,0,0,3.3,0L48.12,46.45A22,22,0,0,0,49.67,17l8.89-8.9a2.33,2.33,0,0,0,0-3.29Z" transform="translate(-2.31 -4.12)"/></svg>
	)
}

export const HighSchool = () => {
	return (
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 34 47.3" xmlSpace="preserve"><title>Asset 5</title><g id="Layer_2_1_"><g id="Layer_2-2"><path className="cls-1" d="M2.1,24.1h29.8c0.6,0,1,0.4,1,1v3.5c0,0.6-0.4,1-1,1H2.1c-0.6,0-1-0.4-1-1v-3.5C1.1,24.5,1.6,24.1,2.1,24.1z" /><path className="cls-1" d="M3.3,29.6l3.4,15.8c0.1,0.5,0.5,0.8,1,0.8h18.6c0.5,0,0.9-0.3,1-0.8l3.4-15.8"/><line className="cls-1" x1="16.8" y1="12.6" x2="16.8" y2="23.6"/><path className="cls-1" d="M13.7,24c-1.8-2.8-2.8-6.1-2.9-9.4c0-6.3,4.2-11.7,5.7-13.3c0.2-0.3,0.7-0.3,0.9-0.1c0,0,0,0,0.1,0.1 c1.5,1.7,5.7,7,5.7,13.3c-0.1,3.4-1.2,6.7-3,9.5"/></g></g></svg>
	)
}

export const College = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.6 47.18"><title>Asset 7</title><g id="Layer_2" dataname="Layer 2"><g id="Layer_2-2" dataname="Layer 2"><rect className="cls-1" x="1.07" y="24" width="31.75" height="5.52" rx="1"/><path className="cls-1" d="M3.26,29.52,6.65,45.36a1,1,0,0,0,1,.82H26.21a1,1,0,0,0,1-.82l3.39-15.84"/><path className="cls-1" d="M4.37,16.81A6.3,6.3,0,0,0,13.28,7.9C11.16,5.78,3.54,4.77,1.47,4.53A.43.43,0,0,0,1,5C1.24,7.07,2.25,14.69,4.37,16.81Z"/><line className="cls-1" x1="6.48" y1="10.15" x2="16.53" y2="20.2"/><path className="cls-1" d="M20.09,5.53a8.47,8.47,0,0,0,12,12c2.85-2.85,4.21-13.1,4.53-15.88A.57.57,0,0,0,36,1C33.19,1.32,22.94,2.68,20.09,5.53Z"/><line className="cls-1" x1="29.04" y1="8.37" x2="16.53" y2="20.2"/><line className="cls-1" x1="16.44" y1="22.55" x2="16.44" y2="19.55"/></g></g></svg>
	)
}

export const Bootcamp = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.75 45.86"><title>Asset 8</title><g id="Layer_2" dataname="Layer 2"><g id="Layer_2-2" dataname="Layer 2"><rect className="cls-1" x="1" y="22.68" width="31.75" height="5.52" rx="1"/><path className="cls-1" d="M3.19,28.2,6.58,44a1,1,0,0,0,1,.82H26.15a1,1,0,0,0,1-.82L30.56,28.2"/><path className="cls-1" d="M6.93,22.56S.42,20.33,1.07,12.16c0,0,8.34.52,12.17,10.24,0,0-2.19-5.83,3.65-11.88"/><path className="cls-1" d="M26.84,22.56s6.51-2.23,5.87-10.4c0,0-8.34.52-12.18,10.24,0,0,2.19-5.83-3.64-11.88"/><path className="cls-1" d="M6.31,14S6.18,10.54,10,6.1c0,0,4.63,3.5,5.24,6.39"/><path className="cls-1" d="M27.47,14s.13-3.43-3.71-7.87c0,0-4.62,3.5-5.24,6.39"/><path className="cls-1" d="M12.1,7.92S14,3,16.87,1"/><path className="cls-1" d="M21.65,7.92S19.8,3,16.87,1"/></g></g></svg>
	)
}

export const Folder = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
	)
}