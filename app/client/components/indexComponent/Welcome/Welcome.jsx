import React from 'react'

import './Welcome.css'

const Welcome = props => {
    const showLoginForm = props.showLoginForm.bind(this)
    const showRegisterForm = props.showRegisterForm.bind(this)

    return (
        <div className="welcome">
            <div className="container">
                <div className="col-lg-12 text-center">
                    <h3>Ласкаво просимо!</h3>
                    <p>Для перегляду курсів увійдіть або зареєструйтесь:</p>
                    <div>
                        <button id="signin" className="btn btn-primary btn-lg" onClick={showLoginForm}>Вхід</button>
                        <button id="signup" className="btn btn-success btn-lg" onClick={showRegisterForm}>Реєстрація</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Welcome
