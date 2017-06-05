const router = require('express').Router()
import * as courseApi from './courseApi'

router.get('/', courseApi.showCoursesPage)

router.get('/coursescounter', courseApi.getCoursesCounter)
router.get('/getcourses', courseApi.getAllCourses)
router.get('/getlectures/:courseLink', courseApi.getLecturesList)
router.get('/getlectures/:courseLink/:lectureLink', courseApi.getCurrentLecture)


export default router
