const ErrorMessage = ({ errorMessage }) => {
    const errorStyle = {
        backgroundColor: '#c0c4c1',
        backgroundColorOpacity: 0.6,
        color: 'red',
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 'px',
        height: '40px',
        marginBottom: '10px',
        borderRadius: '5px',
        paddingBottom: '15px',
        paddingLeft: '5px',
    }

    if (errorMessage === null) {
        return null
    }

    return (
        <div style={errorStyle}>
            <h3 className="error">{errorMessage}</h3>
        </div>
    )
}

export default ErrorMessage