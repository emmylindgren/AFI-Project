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
            <BackButton text='Explore' to='/'/>
            <h1>New Event</h1>
            <Button text='Create Without Preset' buttonColorChoice='green' iconChoice ="add" onClick={() =>{ navigate('/new-event')}}/>

            <div style={EventTemplates}>
            <h3>Presets</h3>
            <Preset title='Promenade'
                infotext='A stroll in the park.'
                suitableFor={["Test", "Test3"]}
                iconSrc='icons/PromenadeIcon.svg'
            />
            <Preset title='Knitting party'
                infotext='Hang on to your knitting skills!'
                suitableFor={["Test", "Test3"]}
                iconSrc='icons/KnittingIcon.svg'
            />
            <Preset title='Card Game'
                infotext='Play a card game with your friends!'
                suitableFor={["Test", "Test3"]}
                iconSrc='icons/CardGameIcon.svg'
            />
            </div>
        </div>
    </div>);
}

export default TemplatePage;