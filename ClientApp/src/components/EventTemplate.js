import Button from './Button';

const container = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
}
const iconStyle = {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '100%',
    padding: '5px',
    backgroundColor: 'var(--light-green)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function EventTemplate({title,description,suitableFor,icon}) {
    return (
    <div style={container}>
        <div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={iconStyle}>
                    <img src={icon} width='25px'/>
                </div>
                <h3>{title}</h3>
            </div>
            <p className='muted-text' style={{margin: '10px 0px 5px 0px'}}>{description}</p>
            <h3 className='muted-text' style={{marginBottom: '5px'}}>Suitable for:</h3>
            <p className='muted-text'>{suitableFor}</p>
        </div>
        <Button text='Create' buttonColorChoice='green' iconChoice ="add" />
    </div> );
}

export default EventTemplate;