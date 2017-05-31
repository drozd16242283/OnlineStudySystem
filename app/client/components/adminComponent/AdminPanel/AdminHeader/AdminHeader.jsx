import React from 'react'

import './AdminHeader.css'

const AdminHeader = () => {
    return (
        <div>
            <header id="header">
        		<hgroup>
        			<h2 className="section_title">Онлайн система освіти КПІК</h2>
        			<div className="btn_view_site"><a href="/">Головна</a></div>
        		</hgroup>
        	</header>
        </div>
    )
}


export default AdminHeader
