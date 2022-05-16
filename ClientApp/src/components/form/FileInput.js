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
    marginBottom: '20px',
    position: 'relative',
}
const inputStyle = {
    width: '100%',
    fontFamily: 'Inter',
    margin: '0',
    top: '0px',
    top: '5px',
}
function FileInput({label, id}) {
    return (
        <div style={style}>
            <label style={inputStyle}>
                <input type='file' name='filename' id={id}/>
                <p style={{color: 'var(--deep-green)', fontWeight: '700', margin: '0 20px 0 0', float: 'right'}}>Pick a file</p>
            </label>
        </div>
    );
}

export default FileInput;