import joi from 'joi'

export function signUp(formData, callback) {
    const { email, username, password } = formData

    const schema = joi.object().keys({
        email: joi.string().email(),
        username: joi.string().min(3).max(30),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    })

    joi.validate(
        { email: email, username: username, password: password },
        schema,
        callback
    )
}

export function signIn(formData, callback) {
    const { email, password } = formData

    const schema = joi.object().keys({
        email: joi.string().email(),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    })

    joi.validate(
        { email: email, password: password },
        schema,
        callback
    )
}
