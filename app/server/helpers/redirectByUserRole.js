const redirectByUserRole = (role) => {
    if (role === 1) {
        location.href = '/admin'
    } else if (role === 2) {
        location.href = '/teacher'
    } else {
        location.href = '/'
    }
}

export default redirectByUserRole
