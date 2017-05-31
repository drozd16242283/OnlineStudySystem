import React from 'react'

import './AuthErrorMessage.css'

const AuthErrorMessage = props => {
    return (
        <div className="AuthError">
            <h5>{props.errorMessage}</h5>
        </div>
    )
}

export default AuthErrorMessage
