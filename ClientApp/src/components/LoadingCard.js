import { useEffect, useState } from 'react';
import '../custom.css'

const textStyle = {

}
const containerStyle = {
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
}

function LoadingCard() {

	return (
	<div style={containerStyle}>
		<img src='icons/SpinnerIcon.svg' className='loading'></img>
	</div>);
}

export default LoadingCard;