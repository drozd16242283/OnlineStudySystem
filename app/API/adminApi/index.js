const router = require('express').Router()

import * as adminApi from './adminApi'

router.get('/', adminApi.adminPanel)
router.get('/users', adminApi.getAllUsers)
router.post('/changerole', adminApi.changeUserRole)
router.post('/newcourse', adminApi.addNewCourse)
router.post('/editcourse', adminApi.editCourse)
router.get('/deletecourse/:courseLink', adminApi.deleteCourse)
router.post('/addlecture', adminApi.addNewLecture)

export default router
