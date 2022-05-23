import Toggle from './Toggle';

const style = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	height: '50px',
	borderStyle: 'none',
	borderRadius: '10px',
	boxShadow: 'none',
	padding: ' 0 20px 0 0',
	marginBottom: '20px',
}

function ToggleInput({ label, enabled, onChange }) {
	return (
		<div>
			<div style={style}>
				<label style={{ marginBottom: '0' }}>{label}</label>
				<Toggle enabled={enabled} onChange={onChange} />
			</div>
		</div>
	);
}

export default ToggleInput;