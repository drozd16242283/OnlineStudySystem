import React from 'react'
import axios from 'axios'
import sendForm from 'server/helpers/forms/sendForm'

import './ChangeRole.css'

const ChangeRole = React.createClass({
    getInitialState() {
        return {
            users: [],
            isSuccess: ''
        }
    },

    componentDidMount() {
        axios.get('admin/users')
            .then(response => this.setState({ users: response.data }))
    },

    changeRole() {
        let changeRolesData = {
            userName: document.getElementsByClassName('selectUser')[0].value,
            role: document.getElementsByClassName('selectRole')[0].value
        }
        sendForm(changeRolesData, '/admin/changerole').then(response => {
            this.setState({ isSuccess: response.data })
        })
    },

    successMessage() {
        let successMessage = (this.state.isSuccess == 1)
            ? <img src="icons/tick.png" />
            : false

        if (successMessage) {
            setTimeout(() => {
                location.href = '/admin'
            }, 300)
        }

        return successMessage
    },

    render() {
        let selectUser = this.state.users.map(el => <option>{el.username}</option>)
        return (
            <div className="container changeRoleBlock">
                <div className="row">
                    <div className="col-xs-8">
                        <h3>Змінити роль користувача</h3>
                        {this.successMessage()}
                        <form method="post" className="form-horizontal">
                            <div className="form-group">
                                <label className="col-xs-4 control-label">Виберіть користувача: </label>
                                <div className="col-xs-4">
                                    <select className="select selectUser">{selectUser}</select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-4 control-label">Виберіть роль: </label>
                                <div className="col-xs-4">
                                    <select className="select selectRole">
                                        <option>Учень</option>
                                        <option>Вчитель</option>
                                        <option>Адміністратор</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <button type="button" className="btn btn-primary changeRoleBtn" onClick={this.changeRole}>Зберегти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})

export default ChangeRole
