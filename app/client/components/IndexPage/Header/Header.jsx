import React from 'react'
import Link from 'react-router/lib/Link'

import './Header.css'

const Header = React.createClass({
    componentDidMount() {
        let userName = localStorage.getItem('username') || false
        if (userName) {
            document.querySelector('.user').classList.add('show')
        }
    },

    linkToRolePage() {
        let role = localStorage.getItem('role')
        if (role == 1) {
            return <li><a href="/admin">Панель адміністратора</a></li>
        } else if (role == 2) {
            return <li><a href="/teacher">Сторінка вчителя</a></li>
        } else if (role == 3) {
            return <li><Link to="/marks">Оцінки</Link></li>
        }
    },

    logOut() {
        localStorage.clear()
        location.href = '/auth/logout'
    },

    render() {
        let userName = localStorage.getItem('username') || false
        return (
            <div>
                <header className="header">
                    <nav className="navbar navbar-inverse" role="navigation">
                        <a className="navbar-brand" href="/">Система онлайн навчання КПІК</a>
                        <ul className="nav navbar-nav">{this.linkToRolePage()}</ul>
                        <div className="user hidden-sm">
                            <div className="userLogo"><img src="images/man.png" /></div>
                            <h5>{userName}</h5>
                            <div className="logout">
                                <button type="button" onClick={this.logOut}><img src="images/logout.png" /></button>
                            </div>
                        </div>
                    </nav>
                </header>
                {this.props.children}
            </div>
        )
    }
})

export default Header
