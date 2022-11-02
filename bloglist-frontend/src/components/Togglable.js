import { useState, forwardRef, useImperativeHandle } from 'react'
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types'

const Togglable = forwardRef((props,refs) => {
    const [visible, setVisible] = useState(false)

    const hideComponent = { display: visible ? 'none' : '' }
    const showComponent = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs,() => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideComponent}>
                <button id="create-new-button" onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showComponent}>
                {props.children}
                <button id="cancel-create-button" onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable