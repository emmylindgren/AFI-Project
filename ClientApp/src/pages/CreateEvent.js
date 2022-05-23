import { useState, useRef } from "react";
import BackButton from "../components/BackButton";
import DisabilityInput from "../components/form/DisabilityInput";
import TextInput from "../components/form/TextInput";
import TimeInput from "../components/form/TimeInput";
import FileInput from "../components/form/FileInput";
import DateInput from "../components/form/DateInput";
import Button from "../components/Button";
import ToggleInput from "../components/form/ToggleInput";
import LocationInput from "../components/form/LocationInput";
import { Navigate, useNavigate } from "react-router-dom";
import { API_ADRESS } from "../config";
import axios from "axios";
import Toggle from "../components/form/Toggle";

const buttonsContainer = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	gap: '20px',
}

function CreateEvent() {

	const navigate = useNavigate()

	const [privateEv, setPrivateEv] = useState(false);
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [time, setTime] = useState('')
	const [date, setDate] = useState('')
	const [adress, setAdress] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [city, setCity] = useState('')

	const [img, setImg] = useState()

	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const disabilityRef = useRef(null)

	const submitEvent = async () => {

		let propicker = document.getElementById('propicker');

		let form = new FormData();

		form.append('eventdata', JSON.stringify({
			Ev_Title: title,
			Ev_Description: description,
			Ev_Private: privateEv,
			Ev_Street: adress,
			Ev_City: city,
			Ev_DateTime: date + ' ' + time,
			Ev_Disabilities: disabilityRef.current.getPillStates(),
			Ev_PostalCode: postalCode,
		}));

		let blob
		// If a file is selected
		if (propicker.files[0]) {
			// Get from user selection.
			blob = await FileReaderPromised(propicker.files[0])
		}
		else {
			setError('No image selected.')
		}

		// Create and append img to form.
		let binaryImg = new File([blob], 'uploadFile.jpg', { type: 'image/jpeg' })
		form.append('uploadFile', binaryImg);

		form.append('id', localStorage.getItem('profileId'))

		axios.post(API_ADRESS + '/api/event', form)
			.then(res => {
				if (res.status >= 200 && res.status < 300) {
					setError('');
					setSuccess('Successfully created event.');
				}
				else {
					setError('Something went wrong. Try again later.');
					setSuccess('');
				}
			})
			.catch(err => {
				setSuccess('')
				setError('Something went REALLY wrong! Try again later.')
				console.error(err);
			});
	}
	return (
		<div className='page-container' style={{ backgroundColor: 'rgb(240,240,240)', }}>
			<div className='page-content'>
				<BackButton text='Back' to='/create-event' />
				<h1>Create New Event</h1>
				<ToggleInput enabled={privateEv} onChange={setPrivateEv} label='Private event' />
				<TextInput value={title} onChange={setTitle} label="Event name" placeholder="Walk in the park..." />
				<TextInput value={description} onChange={setDescription} label="Description" placeholder="A walk in the park..." />
				<TimeInput value={time} onChange={setTime} label="Time" placeholder="14:40..." />
				<DateInput value={date} onChange={setDate} label="Date" placeholder="2022-04-05..." />
				<DisabilityInput ref={disabilityRef} label="Suitable for" />
				<FileInput label="Images" id='propicker' />

				<TextInput value={adress} onChange={setAdress} label="Adress" placeholder="Gnejsvägen 1..." />
				<TextInput value={postalCode} onChange={setPostalCode} label="Postal Code" placeholder="907 40..." />
				<TextInput value={city} onChange={setCity} label="City" placeholder="Stockholm..." />

				<div style={buttonsContainer}>
					<Button text='Cancel' buttonColorChoice='red' onClick={() => navigate('/create-event')} />
					<Button text='Post event' buttonColorChoice='green' onClick={() => submitEvent()} />
				</div>

				<p className='err-text'>{error}</p>
				<p className='success-text'>{success}</p>
			</div>
		</div>
	);
}

function FileReaderPromised(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsArrayBuffer(file);
	}
	);
}

export default CreateEvent;