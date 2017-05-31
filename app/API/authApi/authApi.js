import passport from 'passport'

export function signIn(req, res, next) {
    passport.authenticate('signin', (err, user) => {
        if (err) return res.json({ error: 'Данні не коректні, повторіть спробу' })
        if (!user) return res.json({ error: 'Невірний email чи пароль!' })
        req.logIn(user, (err) => {
            if (err) return res.json({ error: 'Помилка авторизації.' })

            const userData = {
                username: user.username,
                role:     user.role
            }

            return res.json({ user: userData })
        })
    })(req, res, next)
}

export function signUp(req, res, next) {
    passport.authenticate('signup', (err, user) => {
        if (err) return res.json({ error: 'Данні не коректні, повторіть спробу' })
        if (!user) return res.json({ error: 'Цей email вже використовується!' })
        req.logIn(user, (err) => {
            if (err) return res.json({ error: 'Помилка авторизації.' })

            const userData = {
                username: user.username,
                role:     user.role
            }

            return res.json({ user: userData })
        })
    })(req, res, next)
}

export function logOut(req, res) {
    req.session.destroy()
    res.redirect('/')
}
