

const style = {
    backgroundColor: '#fff',
    width: '100%',
    height: '50px',
    borderStyle: 'none',
    borderRadius: '10px',
    boxShadow: 'none',
    paddingLeft: '20px',
    backgroundColor: 'var(--superlight-green)',
}

function WallPost({value, onChange,label,placeholder}) {
    return (
        <div>
            <label>{label}</label>
                <input
                    style={style}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) =>{onChange(e.target.value)}}
                />
        </div>
    );
}

export default WallPost;