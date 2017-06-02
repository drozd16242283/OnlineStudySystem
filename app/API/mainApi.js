const router = require('express').Router()

const redirectToAdminPage = (req, res) => {
    res.redirect('/admin')
}

router.get('/newcourse', redirectToAdminPage)
router.get('/addlecture', redirectToAdminPage)
router.get('/edit', redirectToAdminPage)
router.get('/changerole', redirectToAdminPage)
router.get('/users', redirectToAdminPage)





router.get('/courses/:courseLink/:lectureLink', (req, res) => {
    res.redirect('/courses')
})

export default router
