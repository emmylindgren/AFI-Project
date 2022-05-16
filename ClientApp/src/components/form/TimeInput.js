import '../InputStyle.css'
const style = {
    backgroundColor: '#fff',
    width: '100%',
    height: '50px',
    borderStyle: 'none',
    borderRadius: '10px',
    boxShadow: 'none',
    paddingLeft: '20px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative'
}
const inputStyle = {
    position: 'absolute',
    top: '0',
    left: '20px',
    background: 'none',
    width: '95%',
    height: '50px',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--gray)',
}

function TimeInput({value, onChange,label,placeholder}) {
    return (
        <div>
            <label>{label}</label>
            <div style={style}>
                <input
                    type='time'
                    style={inputStyle}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) =>{onChange(e.target.value)}}
                />
                <p style={{color: 'var(--deep-green)', margin: '0px 20px 0px 0px', fontWeight: '700'}}>Pick Time</p>
            </div>
        </div>
    );
}

export default TimeInput;