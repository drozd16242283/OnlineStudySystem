const router = require('express').Router()

const redirectToAdminPage = (req, res) => {
    res.redirect('/admin')
}
router.get('/newcourse', redirectToAdminPage)
router.get('/addlecture', redirectToAdminPage)
router.get('/editcourse', redirectToAdminPage)
router.get('/editlecture', redirectToAdminPage)
router.get('/changerole', redirectToAdminPage)
router.get('/users', redirectToAdminPage)


const redirectToCoursesPage = (req, res) => {
    res.redirect('/courses')
}
router.get('/courses/:courseLink', redirectToCoursesPage)
router.get('/courses/:courseLink/:lectureLink', redirectToCoursesPage)


const redirectToTeacherPage = (req, res) => {
    res.redirect('/teacher')
}
router.get('/teacher/:route', redirectToTeacherPage)

router.get('/marks', (req, res) => {
    res.redirect('/')
})

export default router
