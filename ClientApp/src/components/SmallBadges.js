import { useEffect, useState } from "react";
import { Badge } from "reactstrap";
import { API_ADRESS } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const badgeContainer = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	cursor: 'pointer',
}

function SmallBadges() {

	const [badgeData, setBadgeData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios.defaults.headers.common = {
			"ApiKey": localStorage.getItem("ApiKey"),
		}
		axios.get(API_ADRESS + '/api/profile/badges/' + localStorage.getItem('profileId'))
			.then(res => {
				console.log(res)
				if (res.status >= 200 && res.status < 300) {
					setBadgeData(res.data)
					console.log(res.data)
				}
			})
			.catch(err => {
				console.error(err)
			})
	}, [])


	return (
		<div style={{ marginTop: '20px' }}>
			<h3> Badges </h3>
			<div style={badgeContainer} onClick={() => { navigate('/badges') }}>
				<div>
					{badgeData.map((badge, index) => {
						return (
							<>
								<img
									src={API_ADRESS + '/api/badge/image/' + badge.ba_Id}
									height='100px'
									style={{ transform: `translateX(-${50 * index}%)` }} />
							</>)
					})}
				</div>
				<h3 class='clickable-text' style={{ whiteSpace: 'nowrap' }}> See all </h3>
			</div>
		</div>
	);
}

export default SmallBadges;