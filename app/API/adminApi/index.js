const router = require('express').Router()

import * as adminApi from './adminApi'

router.get('/', adminApi.adminPanel)
router.get('/users', adminApi.getAllUsers)

router.post('/changerole', adminApi.changeRole)
router.post('/newcourse', adminApi.addNewCourse)
router.post('/addlecture', adminApi.addNewLecture)

export default router
