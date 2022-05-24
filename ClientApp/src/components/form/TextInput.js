const style = {
    backgroundColor: '#fff',
    width: '100%',
    height: '50px',
    borderStyle: 'none',
    borderRadius: '10px',
    boxShadow: 'none',
    paddingLeft: '20px',
}

function TextInput({ value, onChange, label, placeholder }) {
    return (
        <div>
            <label>{label}</label>
            <input
                style={style}
                placeholder={placeholder}
                value={value}
                onChange={(e) => { onChange(e.target.value) }}
            />
        </div>
    );
}

export default TextInput;