import React from 'react';
import { useState, useImperativeHandle, forwardRef } from 'react';
import '../../custom.css';


const style = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	backgroundColor: 'var(--superlight-green)',
	borderStyle: 'solid',
	borderColor: 'var(--superlight-green)',
	borderRadius: '200px',
	padding: '5px 10px 5px 10px',
	width: 'fit-content',
	transitionDuration: '200ms'
}
const selectedStyle = {
	borderStyle: 'solid',
	borderColor: 'var(--deep-green)',
	backgroundColor: 'var(--light-green)',
	transitionDuration: '200ms'
}

const Category = forwardRef((props, _ref) => {

	const [selection, setSelection] = useState(false)

	useImperativeHandle(_ref, () => ({
		getSelected: () => {
			return selection;
		},
		setSelected: (selected) => {
			setSelection(selected)
		}
	}));


	return (
		<div
			style={selection ? { ...style, ...selectedStyle } : style}
			onClick={() => { setSelection(!selection) }}
		>
			<p style={{ marginBottom: 0, padding: '5px' }}>{props.name}</p>
		</div>
	)
})

export default Category;