import React from 'react'

const AdminLogout = React.createClass({
    componentDidMount() {
        localStorage.clear()
        location.href = '/auth/logout'
    },
    render() {
        return false
    }
})

export default AdminLogout
