const style = {
    backgroundColor: '#fff',
    flexDirecton: 'column',
    width: '100%',
    height: '50px',
    borderStyle: 'none',
    borderRadius: '10px',
    boxShadow: 'none',
    paddingLeft: '20px',
    paddingTop: '10px',
    backgroundColor: 'var(--superlight-green)',
    resize: 'none',
    transitionDuration: '200ms',
}

const focusedStyle = {
    height: '100px',
}

function WallPost({ value, onChange, label, placeholder, open }) {

    return (
        <div style={{ flex: 1, paddingRight: '20px' }}>
            <label>{label}</label>
            <textarea
                style={open ? { ...style, ...focusedStyle } : style}
                placeholder={placeholder}
                value={value}
                onChange={(e) => { onChange(e.target.value) }}
            />
        </div>
    );
}

export default WallPost;