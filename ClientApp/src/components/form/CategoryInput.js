import React from 'react';
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import { API_ADRESS } from '../../config';
import Category from './Category';
import LoadingCard from '../LoadingCard';

const categoryStyle = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	gap: '10px',
	backgroundColor: 'var(--white)',
	borderRadius: '10px',
	padding: '10px',
	margin: '0 0 20px 0',
}

const CategoryInput = forwardRef((props, _ref) => {

	const [categories, setCategories] = useState([]);
	const [state, setState] = useState('loading');

	const pills = useRef([]);

	useEffect(() => {
		axios.get(API_ADRESS + '/api/category')
			.then(res => {
				console.log(res.data)
				setCategories(res.data);
				setTimeout(() => {
					setState('loaded')
				}, 1500);
			})
	}, []);

	// useImperativeHabdle makes "getPillStates" visible from child reference in parent component. 
	// from: ref.current.getPillStates()
	useImperativeHandle(_ref, () => ({
		// Toss child state into parent component
		getPillStates: () => {

			let selections = [];
			pills.current.forEach(pill => {
				selections.push(pill.getSelected())
			})
			let categories = [];
			for (let i = 0; i < selections.length; i++) {
				if (selections[i] === true) {
					categories.push({ Cat_Id: i + 1 })
				}
			}
			return categories;
		},
		setPillStates: (categories) => {

			categories.forEach(category => {
				pills.current[category.cat_Id].setSelected(true);
			})
		}
	}));

	const renderPills = (d) => {
		return d.map(category => {
			return (<div key={category.cat_Id}><Category name={category.cat_Name} ref={el => pills.current[category.cat_Id] = el} /></div>)
		})
	}

	return (
		<div>
			<label>Categories</label>
			<div style={categoryStyle}>
				{state === 'loaded' ?
					(
						renderPills(categories)
					) : (
						<LoadingCard />
					)}
			</div>
		</div>
	)
})

export default CategoryInput;