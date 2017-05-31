const router = require('express').Router()
import * as courseApi from './courseApi'

router.get('/', courseApi.showCoursesPage)
router.get('/getcourses', courseApi.getAllCourses)

export default router
