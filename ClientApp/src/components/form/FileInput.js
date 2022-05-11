import '../../custom.css'

const style = {
    backgroundColor: 'var(--white)',
}
function FileInput() {
    return (
        <div style={style}>
            <label>Pick file</label>
            <input type='file' name='filename'/>
        </div>
    );
}

export default FileInput;