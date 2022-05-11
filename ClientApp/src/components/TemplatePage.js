import '../custom.css'
import BackButton from './BackButton';
import Button from './Button';
import EventTemplate from './EventTemplate';

const EventTemplates = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '40px',
}

function TemplatePage() {
    return (
    <div className='page-container'>
        <div className='page-content'>
            <BackButton text='Explore' to='/'/>
            <h1>New Event</h1>
            <Button text='Create Without Preset' buttonColorChoice='green' iconChoice ="add"/>

            <div style={EventTemplates}>
            <h3>Presets</h3>
            <EventTemplate title='Promenade'
                description='A stroll in the park.'
                suitableFor={["Test", "Test3"]}
                icon='icons/PromenadeIcon.svg'
            />
            <EventTemplate title='Knitting party'
                description='Hang on to your knitting skills!'
                suitableFor={["Test", "Test3"]}
                icon='icons/KnittingIcon.svg'
            />
            <EventTemplate title='Card Game'
                description='Play a card game with your friends!'
                suitableFor={["Test", "Test3"]}
                icon='icons/CardGameIcon.svg'
            />
            </div>
        </div>
    </div>);
}

export default TemplatePage;