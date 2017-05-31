import React from 'react'

import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

const AdminComponent = React.createClass({
    render() {
        return (
            <div>
                <AdminHeader />
                <AdminSidebar />
                {this.props.children}
            </div>
        )
    }
})

export default AdminComponent
