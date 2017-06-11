const router = require('express').Router()

import * as teacherApi from './teacherApi'

router.get('/', teacherApi.showTeacherPage)
router.post('/submitmarks', teacherApi.submitPracticalMarks)
router.get('/download/:practical', teacherApi.downloadPractical)

export default router
