import React from 'react'
import axios from 'axios'

import './ShowAllUsers.css'

const ShowAllUsers = React.createClass({
    getInitialState() {
        return {
            usersList: [],
            limitUsers: 5
        }
    },

    componentDidMount() {
        axios.get('admin/users')
            .then(response => this.setState({ usersList: response.data }))
    },

    showAllUsers() {
        let usersListLength = this.state.usersList.length
        let sidebarHeight = usersListLength * 115
        document.querySelector('aside#sidebar').style.height = `${sidebarHeight}px`

        this.setState({ limitUsers: usersListLength })
    },

    render() {
        let showAllUsersButton = (this.state.limitUsers != this.state.usersList.length)
            ? <button className="btn btn-primary" onClick={this.showAllUsers}>Показати усіх</button>
            : false

        let users = this.state.usersList.map((el, i) => {
            if (i >= this.state.limitUsers) return
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
                {showAllUsersButton}
            </div>
        )
    }
})

export default ShowAllUsers
