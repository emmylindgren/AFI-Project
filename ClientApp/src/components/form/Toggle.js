import '../../custom.css'

const barStyle = {
	background: '#ccc',
	width: '40px',
	height: '20px',
	borderRadius: '20px',
	transitionDuration: '100ms',
}

const circleStyle = {
	background: 'var(--gray)',
	position: 'relative',
	width: '25px',
	height: '25px',
	borderRadius: '50%',
	bottom: '22px',
	transitionDuration: '100ms',
	transitionFunction: 'ease-in-out',
}
const enabledCircleStyle = {
	background: 'var(--deep-green)',
	transform: 'translateX(17px)',
	transitionDuration: '100ms',
}
const enabledBarStyle = {
	background: 'var(--light-green)',
	transitionDuration: '100ms',
}

function Toggle({ enabled, onChange }) {

	return (
		<div onClick={() => { onChange(!enabled) }} style={{ height: '20px' }}>
			<div style={enabled ? { ...barStyle, ...enabledBarStyle } : barStyle}></div>
			<div style={enabled ? { ...circleStyle, ...enabledCircleStyle } : circleStyle}>
			</div>
		</div>
	);
}

export default Toggle;