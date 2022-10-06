export function IconArrowLine(props) {
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