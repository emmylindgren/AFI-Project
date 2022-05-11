import Button from './Button';

const container = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
}

function EventTemplate({title,description,suitableFor}) {
    return (
    <div style={container}>
        <div>
            <h3>{title}</h3>
            <p className='muted-text'>{description}</p>
            <h3 className='muted-text'>Suitable for:</h3>
            <p className='muted-text'>{suitableFor}</p>
        </div>
        <Button text='Create' buttonColorChoice='green' iconChoice ="add" />
    </div> );
}

export default EventTemplate;