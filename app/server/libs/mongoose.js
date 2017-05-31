import mongoose from 'mongoose'
import config from '../config'

mongoose.Promise = global.Promise

mongoose.connect(config.get('db:dbAdress'), (err, resp) => {
    let response = err ? 'Fail' : 'Success'
    console.log(`Database connection is: ${response}`)
})


export default mongoose
