import '../custom.css'
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Preset from '../components/Preset';
import { useNavigate } from 'react-router-dom';

const EventTemplates = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '40px',
}

function TemplatePage() {

    const navigate = useNavigate();

    return (
    <div className='page-container'>
        <div className='page-content'>
            <BackButton text='Explore' to='/explore'/>
            <h1>New Event</h1>
            <Button text='Create Without Preset' buttonColorChoice='green' iconChoice ="add" onClick={() =>{ navigate('/new-event')}}/>

            <div style={EventTemplates}>
            <h3>Presets</h3>
            <Preset title='Promenade'
                infotext='A stroll in the park.'
                suitableFor={["Hearing impared, Sight Impaired"]}
                iconSrc='icons/PromenadeIcon.svg'
            />
            <Preset title='Knitting party'
                infotext='Hang on to your knitting skills!'
                suitableFor={["Hearing impared, Limited mobility"]}
                iconSrc='icons/KnittingIcon.svg'
            />
            <Preset title='Card Game'
                infotext='Play a card game with your friends!'
                suitableFor={["Limited mobility, Hearing impared"]}
                iconSrc='icons/CardGameIcon.svg'
            />
            </div>
        </div>
    </div>);
}

export default TemplatePage;