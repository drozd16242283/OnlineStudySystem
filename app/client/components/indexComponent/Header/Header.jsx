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

    logOut() {
        localStorage.clear()
        location.href = '/auth/logout'
    },

    render() {
        let userName = localStorage.getItem('username') || false
        let linkToAdminPanel = (localStorage.getItem('role') == 1)
            ? <li><a href="/admin">Адмінка</a></li>
            : false

        return (
            <div>
                <header className="header">
                    <nav className="navbar navbar-inverse" role="navigation">
                        <a className="navbar-brand" href="/">Система онлайн навчання КПІК</a>
                        <ul className="nav navbar-nav">
                            {linkToAdminPanel}
                            <li><Link to="/about">Про нас</Link></li>
                        </ul>
                        <div className="user hidden-sm">
                            <div className="userLogo"><img src="icons/man.png" /></div>
                            <h5>{userName}</h5>
                            <div className="logout">
                                <button type="button" onClick={this.logOut}><img src="icons/logout.png" /></button>
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
