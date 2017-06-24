import React from 'react'
import sendForm from 'server/helpers/forms/validateAndSend/sendForm'
import isFormEmpty from 'server/helpers/forms/validateAndSend/isFormEmpty'
import redirectByUserRole from 'server/helpers/redirectByUserRole'
import AuthErrorMessage from '../AuthErrorMessage'

import './SignIn.css'

const SignIn = React.createClass({
    getInitialState() {
        return {
            loginError: ''
        }
    },

    sendLoginForm() {
        let formData = {
            email: document.getElementsByName('email')[0].value,
            passwd: document.getElementsByName('passwd')[0].value
        }

        if (isFormEmpty(formData)) {
            this.setState({ loginError: 'Заповніть форму!' })
        } else {
            sendForm(formData, '/auth/signin').then(response => {
                if (response.data.error) {
                    this.setState({ loginError: response.data.error })
                } else if (response.data.user) {
                    const user = response.data.user
                    localStorage.setItem("username", user.username)
                    localStorage.setItem("role", user.role)
                    redirectByUserRole(user.role)
                }
            })
        }
    },

    render() {
        let errorMessage = this.state.loginError
            ? <AuthErrorMessage errorMessage={this.state.loginError} />
            : false

        return (
            <div className="loginForm">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <form method="post" className="form-horizontal form-login">
                                <div className="form-group">
                                    <label className="col-xs-3 control-label">Email:</label>
                                    <div className="col-xs-9">
                                        <input type="text" name="email" className="form-control" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-3 control-label">Пароль:</label>
                                    <div className="col-xs-9">
                                        <input type="password" name="passwd" className="form-control" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <button type="button" className="btn btn-primary" onClick={this.sendLoginForm}>Вхід</button>
                                </div>
                                {errorMessage}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})


export default SignIn
