import '../custom.css'
import BackButton from './BackButton';
import Button from './Button';
import EventTemplate from './EventTemplate';

const EventTemplates = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
}

function TemplatePage() {
    return (
    <div className='page-container'>
        <div className='page-content'>
            <BackButton text='Explore' to='/'/>
            <h1>New Event</h1>
            <h3>Presets</h3>
            <Button text='Create Without Preset' buttonColorChoice='green' iconChoice ="add"/>

            <div style={EventTemplates}>
            <EventTemplate title='Promenade' description='A stroll in the park.' suitableFor={["Test", "Test3"]}/>
            </div>
        </div>
    </div>);
}

export default TemplatePage;