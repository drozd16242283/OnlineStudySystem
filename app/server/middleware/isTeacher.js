const isTeacher = (req, res, next) => {
    if (req.user) {
        (req.user.role === 2) ? next() : res.redirect('/')
    } else {
        res.redirect('/')
    }
}

export default isTeacher
