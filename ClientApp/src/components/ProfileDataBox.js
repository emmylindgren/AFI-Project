const boxStyle = {
	height: '50px',
	background: 'var(--superlight-green)',
	borderRadius: '10px',
	display: 'flex',
	alignItems: 'center',
	padding: '0 0 0 20px'
}

function ProfileDataBox({ text, label }) {
	return (
		<>
			<label>{label}</label>
			<div style={boxStyle}>
				<p style={{ margin: '0' }}>{text}</p>
			</div>
		</>
	);
}

export default ProfileDataBox;