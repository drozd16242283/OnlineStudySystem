import React from 'react'
import axios from 'axios'

import './ShowAllUsers.css'

const ShowAllUsers = React.createClass({
    getInitialState() {
        return {
            usersList: []
        }
    },

    componentDidMount() {
        axios.get('admin/users')
            .then(response => this.setState({ usersList: response.data }))
    },

    render() {
        let users = this.state.usersList.map(el => {
            return (
                <li key={el._id}>
                    <h5 className="userLogo">{el.username}</h5>
                    <p>Електронна адреса: {el.email}</p>
                    <p>Роль: {el.role}</p>
                </li>
            )
        })
        return (
            <div className="usersBlock">
                <h3>Список усіх користувачів:</h3>
                <ul className="usersList">{users}</ul>
            </div>
        )
    }
})

export default ShowAllUsers
