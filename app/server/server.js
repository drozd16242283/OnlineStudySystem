import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import passport from 'passport'
import config from './config'
import isAdmin from './middleware/isAdmin'
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

// Set API's to Express
import authApi from '../API/authApi'
import adminApi from '../API/adminApi'
import courseApi from '../API/courseApi'

app.use('/auth', authApi)
app.use('/admin', isAdmin, adminApi)
app.use('/courses', courseApi)


// Starting the server
app.listen(config.get('port'), () => {
    console.log(`Server start at ${config.get('port')} port!`)
})

export default app
