import localStrategy from 'passport-local/lib/strategy'
import userModel from '../../models/userModel'
import * as validation from './authValidation'


const passportStrategy = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        userModel.getUserById(id, (err, user) => {
            if (err) return done(err)

            done(err, user)
        })
    })

    passport.use('signup', new localStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            const userData = {
                email: req.body.registerEmail,
                username: username,
                password: password
            }
            validation.signUp(userData, (err, success) => {
                if (err) return done(err, false)

                userModel.getUserByEmail(userData.email, (err, user) => {
                    if (err) return done(err, false)

                    if (user) {
                        return done(null, false)
                    } else {
                        let newUser = new userModel(userData)
                        newUser.createUser(newUser, (err, user) => {
                            if (err) return done(err, false)

                            return done(null, user)
                        })
                    }
                })
            })
        }
    ))

    passport.use('signin', new localStrategy(
        {  usernameField: 'email',
           passwordField: 'passwd' },
        (email, password, done) => {
            const userData = {
                email: email,
                password: password
            }
            validation.signIn(userData, (err, success) => {
                if (err) return done(err, false)

                userModel.getUserByEmail(email, (err, user) => {
                    if (err) return done(err, false)
                    if (!user) {
                        return done(null, false)
                    } else {
                        userModel.comparePassword(password, user.password, (err, isMatch) => {
                            if (err) return done(err, false)

                            return isMatch ? done(null, user) : done(null, false)
                        })
                    }
                })
            })
        }
    ))
}


export default passportStrategy
