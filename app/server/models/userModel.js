import bcrypt from 'bcrypt-node'
import mongoose from '../libs/mongoose'

let userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: Number
})

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.statics.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, callback)
}

userSchema.statics.getUserByUsername = function(username, callback) {
    this.findOne({ username: username }, callback)
}

userSchema.statics.getUserByEmail = function(email, callback) {
    this.findOne({ email: email }, callback)
}

userSchema.statics.getUserById = function(id, callback) {
    this.findById({ _id: id }, callback)
}

userSchema.statics.getUserRole = function(username, callback) {
    this.findOne({ username: username }, { _id:0, role:1 }, callback)
}

userSchema.methods.createUser = function(newUser, callback) {
    newUser.password = this.encryptPassword(newUser.password)
    newUser.role = 3

    newUser.save(callback)
}


const userModel = mongoose.model('User', userSchema)

export default userModel
