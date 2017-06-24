import React from 'react'
import Link from 'react-router/lib/Link'

import './AdminSidebar.css'

const AdminSidebar = () => {
    let adminName = localStorage.getItem('username')
    return (
        <div>
            <section id="secondary_bar">
        		<div className="user">
        			<p><a href="/admin">{adminName}</a></p>
        		</div>
        	</section>
            <aside id="sidebar">
        		<h3>Курси</h3>
        		<ul>
        			<li className="icn_new_article"><Link to="/newcourse" activeClassName='active'>Новий курс</Link></li>
                    <li className="icn_new_article"><Link to="/addlecture" activeClassName='active'>Додати лекцію або практичну</Link></li>
                    <li className="icn_edit_article"><Link to="/editcourse" activeClassName='active'>Редагувати курс</Link></li>
                    <li className="icn_edit_article"><Link to="/editlecture" activeClassName='active'>Редагувати лекцію</Link></li>
        		</ul>
        		<h3>Користувачі</h3>
        		<ul>
        			<li className="icn_add_user"><Link to="/changerole" activeClassName='active'>Змінити ролі</Link></li>
        			<li className="icn_view_users"><Link to="/users" activeClassName='active'>Переглянути користувачів</Link></li>
        		</ul>
        		<h3>Вихід</h3>
        		<ul>
        			<li className="icn_jump_back"><Link to="/logout">Logout</Link></li>
        		</ul>
                
        	</aside>
        </div>
    )
}

export default AdminSidebar
