import BackButton from "../components/BackButton";
import Badge from "../components/Badge";
import axios from 'axios';
import { API_ADRESS } from "../config";
import { useState, useEffect } from "react";
import LoadingCard from "../components/LoadingCard";
import ErrorCard from "../components/ErrorCard";

const badgeContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	width: '100%',
	justifyContent: 'space-between',
	alignItems: 'center',

}

function Badges() {

	const [badgeData, setBadgeData] = useState([]);
	const [state, setState] = useState('loading');

	useEffect(() => {
		axios.defaults.headers.common = {
			"ApiKey": localStorage.getItem("ApiKey"),
		}
		axios.get(API_ADRESS + '/api/profile/badges/' + localStorage.getItem('profileId'))
			.then(res => {
				console.log(res.data)
				if (res.status >= 200 && res.status < 300) {
					setBadgeData(res.data)
					if (res.data.length === 0) setState('empty')
					else setState('loaded')
				}
			})
			.catch(err => {
				console.error(err)
				setState('error')
			})
	}, [])

	const getContentfulJsx = () => {
		return (
			<div style={badgeContainer}>
				{badgeData.map((badge, index) => {
					return (
						<div style={{ width: '50%' }}>
							<Badge badgeInfo={badge.pr_Ba_Badge} dateReceived={badge.pr_Ba_DateRecieved} key={badge.ba_Id} />
						</div>)
				})}
			</div>)
	}

	const getJsx = () => {
		switch (state) {
			case 'loading':
				return <LoadingCard />
			case 'loaded':
				return getContentfulJsx()
			case 'error':
				return <ErrorCard
					iconChoice={'filenotfound'}
					infoText={"Something went wrong when fetching your badges! Try again later."}
				/>
			case 'empty':
				return <ErrorCard
					infoText={"You dont have any badges yet! Try to get some!"}
				/>
		}
	}

	return (
		<div className='page-container'>
			<div className='page-content'>
				<BackButton text='Profile' to='/profile' />
				<h1>Your Badges</h1>
				<h2>{badgeData.length}/60 unlocked</h2>

				{getJsx()}

			</div>
		</div>
	);
}

export default Badges;