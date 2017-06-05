const router = require('express').Router()

const redirectToAdminPage = (req, res) => {
    res.redirect('/admin')
}

const redirectToCoursesPage = (req, res) => {
    res.redirect('/courses')
}

router.get('/newcourse', redirectToAdminPage)
router.get('/addlecture', redirectToAdminPage)
router.get('/edit', redirectToAdminPage)
router.get('/changerole', redirectToAdminPage)
router.get('/users', redirectToAdminPage)

router.get('/courses/:courseLink', redirectToCoursesPage)
router.get('/courses/:courseLink/:lectureLink', redirectToCoursesPage)



export default router
