import '../../custom.css'
import '../InputStyle.css'

const style = {
    backgroundColor: 'var(--white)',
    borderRadius: '10px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'none',
    paddingLeft: '20px',
    marginBottom: '20px'
}
const inputStyle = {
    width: '70%',
    color: 'var(--gray)',
    fontFamily: 'Inter'
}
function FileInput({label}) {
    return (
        <div>
            <label>{label}</label>
            <div style={style}>
                <input type='file' name='filename' style={inputStyle}/>
                <p style={{color: 'var(--deep-green)', fontWeight: '700', margin: '0 20px 0 0'}}>Pick a file</p>
            </div>
        </div>
    );
}

export default FileInput;