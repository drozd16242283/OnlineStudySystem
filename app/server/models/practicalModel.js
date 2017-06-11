import mongoose from '../libs/mongoose'

let practicalSchema = mongoose.Schema({
    userName: String,
    practicalName: String,
    fileName: String,
    mark: Number,
    filePath: String
})

practicalSchema.methods.addNewPractical = function(newPractical, callback) {
    newPractical.save(callback)
}

practicalSchema.statics.getAllPracticals = function(callback) {
    this.find({}, { __v: 0 }, callback)
}

practicalSchema.statics.submitPracticalMarks = function(marksData, callback) {
    this.update(
        { userName: marksData.userName, fileName: marksData.fileName },
        { $set: { mark: marksData.mark } },
        callback
    )
}

const practicalModel = mongoose.model('Practical', practicalSchema)

export default practicalModel
