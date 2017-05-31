import React from 'react'

import sendForm from 'server/helpers/forms/sendForm'
import isFormEmpty from 'server/helpers/forms/isFormEmpty'

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
                let error = response.data.error
                let user = response.data.user

                if (error) {
                    this.setState({ loginError: error })
                } else if (user) {
                    localStorage.setItem("username", user.username)
                    localStorage.setItem("role", user.role)
                    let redirectUrl = (user.role === 1) ? '/admin' : '/'

                    location.href = redirectUrl
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
