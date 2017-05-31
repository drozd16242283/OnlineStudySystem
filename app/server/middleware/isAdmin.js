const isAdmin = (req, res, next) => {
    if (req.user) {
        (req.user.role === 1) ? next() : res.redirect('/')
    } else {
        res.redirect('/')
    }
}

export default isAdmin
