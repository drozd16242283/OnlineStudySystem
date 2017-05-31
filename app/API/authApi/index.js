const router = require('express').Router()
import * as authApi from './authApi'

router.post('/signin', authApi.signIn)
router.post('/signup', authApi.signUp)
router.get('/logout', authApi.logOut)

export default router
