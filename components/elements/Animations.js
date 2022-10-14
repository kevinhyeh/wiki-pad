import {Gear, Bell, Plug, Play} from './Icons'

import './Animations.scss';

export const ClockRotate = (props) => {
  return (
		<div className={`clock${props.animate ? ' animate' : ''}`}>
			<div className="clock__hours"></div>
			<div className="clock__minutes"></div>
		</div>
  );
}

export const FolderExpand = (props) => {
  return (
		<div className={`folders${props.animate ? ' animate' : ''}`}>
			<div className="folder-container"><div className="folder"></div></div>
			<div className="folder-container"><div className="folder"></div></div>
			<div className="folder-container"><div className="folder"></div></div>
		</div>
  );
}

export const OldNewBanner = (props) => {
  return (
		<div className={`old-new${props.animate ? ' animate' : ''}`}>
			<div className="old-new-container">old</div>
			<div className="old-new-container">new</div>
		</div>
  );
}

export const GearsRotate = (props) => {
  return (
		<div className={`gears${props.animate ? ' animate' : ''}`}>
			<Gear />
			<Gear />
		</div>
  );
}

export const BellWiggle = (props) => {
  return (
		<div className={`bell${props.animate ? ' animate' : ''}`}>
			<Bell />
		</div>
  );
}

export const PlugAndPlay = (props) => {
  return (
		<div className={`plug-and-play${props.animate ? ' animate' : ''}`}>
			<Plug />
			<Play />
		</div>
  );
}