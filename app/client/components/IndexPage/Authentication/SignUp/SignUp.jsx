import React from 'react'
import sendForm from 'server/helpers/forms/validateAndSend/sendForm'
import isFormEmpty from 'server/helpers/forms/validateAndSend/isFormEmpty'
import AuthErrorMessage from '../AuthErrorMessage'

import './SignUp.css'


const SignUp = React.createClass({
    getInitialState() {
        return {
            registerError: ''
        }
    },

    sendRegisterForm() {
        let formData = {
            registerEmail: document.getElementsByName('registerEmail')[0].value,
            username: document.getElementsByName('username')[0].value,
            password: document.getElementsByName('password')[0].value
        }

        if (isFormEmpty(formData)) {
            this.setState({ registerError: 'Заповніть форму!' })
        } else {
            sendForm(formData, '/auth/signup').then(response => {
                if (response.data.error) {
                    this.setState({ registerError: response.data.error })
                }
                if (response.data.user) {
                    localStorage.setItem("username", response.data.user.username)
                    location.href = '/'
                }
            })
        }
    },

    render() {
        let errorMessage = this.state.registerError
            ? <AuthErrorMessage errorMessage={this.state.registerError} />
            : false

        return (
            <div className="registerForm">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <form method="post" className="form-horizontal form-register">
                                <div className="form-group">
                                    <label className="col-xs-3 control-label">Email:</label>
                                    <div className="col-xs-9">
                                        <input type="email" name="registerEmail" className="form-control" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-3 control-label">Ім’я:</label>
                                    <div className="col-xs-9">
                                        <input type="text" name="username" className="form-control" placeholder="Login" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-3 control-label">Пароль:</label>
                                    <div className="col-xs-9">
                                        <input type="password" name="password" className="form-control" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <button type="button" className="btn btn-success" onClick={this.sendRegisterForm}>Реєстрація</button>
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

export default SignUp
