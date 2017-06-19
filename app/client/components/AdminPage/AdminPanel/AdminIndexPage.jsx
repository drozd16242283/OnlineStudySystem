import React from 'react'

import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

const AdminIndexPage = props => {
    let children = (props.children == null)
        ? <h3>Ласкаво просимо на панель Адміністратора!</h3>
        : props.children
        
    return (
        <div>
            <AdminHeader />
            <AdminSidebar />
            {children}
        </div>
    )
}

export default AdminIndexPage
