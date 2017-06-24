import https from 'https'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'
import passport from 'passport'
import config from './config'
// Session store
const MongoStore = require('connect-mongo')(session)


const app = express()


app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public/')))

// Init session from config and MongoStore
app.use(session({
    secret: config.get('session:secret'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ url: config.get('db:dbAdress') })
}))

// Init passport
app.use(passport.initialize())
app.use(passport.session())
import localPassport from './libs/authentication/authStrategyPassport'
localPassport(passport)

// Redirect to https
app.all('*', function(req, res, next) {
	if (req.secure) {
		return next()
	}
	res.redirect('https://localhost:'+HTTPS_PORT+req.url);
})

// Set API's to Express
import isAdmin from './middleware/isAdmin'
import isTeacher from './middleware/isTeacher'

import authApi from '../API/authApi'
import adminApi from '../API/adminApi'
import courseApi from '../API/courseApi'
import teacherApi from '../API/teacherApi'
import mainApi from '../API/mainApi'

app.use('/auth', authApi)
app.use('/admin', isAdmin, adminApi)
app.use('/courses', courseApi)
app.use('/teacher', isTeacher, teacherApi)
app.use('/', mainApi)


// Starting the server
app.listen(6666, () => {
    console.log(`Server start at ${config.get('port')} port!`)
})

https.createServer({
	key: fs.readFileSync(path.join(__dirname, '../ssl/server.key'), 'utf8'),
	cert: fs.readFileSync(path.join(__dirname, '../ssl/server.crt'), 'utf8')
}, app).listen(6677, () => {
	console.log(`Https connection starts at the ${config.get('port')} port!`)
})

export default app
