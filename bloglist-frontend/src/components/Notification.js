const Notification = ({ notification }) => {
    const notificationStyle = {
        backgroundColor: '#c0c4c1',
        backgroundColorOpacity: 0.6,
        color: 'green',
        borderColor: 'green',
        borderStyle: 'solid',
        borderWidth: 'px',
        height: '40px',
        marginBottom: '10px',
        borderRadius: '5px',
        paddingBottom: '15px',
        paddingLeft: '5px',
    }

    if (notification === null){
        return null
    }
    return (
        <div style={notificationStyle}>
            <h3>{notification}</h3>
        </div>
    )
}

export default Notification