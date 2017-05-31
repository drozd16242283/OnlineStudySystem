import randomToken from 'rand-token'
import mongoose from '../libs/mongoose'
import escapeHtml from '../helpers/escapeHtml'


/*let commentSchema = new mongoose.Schema({
    author: String,
    commentText: String,
    role: Number
})*/

let courseSchema = new mongoose.Schema({
    courseName: String,
    courseDescription: String,
    courseImage: String,
    courseLink: String,
    lectures: {
        type: Array,
        "default": []
    },
    comments: {
        type: Array,
        "default": []
    }
})


courseSchema.methods.addNewCourse = function(newCourse, callback) {
    let link = escapeHtml(newCourse.courseName.toLowerCase()) + randomToken.generate(16)
    newCourse.courseLink = link

    newCourse.save(callback)
}

courseSchema.statics.addNewLecture = function(newLecture, callback) {
    let link = escapeHtml(newLecture.lectureName.toLowerCase()) + randomToken.generate(16)
    let lectureData = {
        lectureName: newLecture.lectureName,
        lectureText: newLecture.lectureText,
        lectureLink: link,
        isLecture: newLecture.isLecture
    }
    this.update(
        { courseName: newLecture.courseName },
        { $push: { "lectures": lectureData } },
        callback
    )
}


const courseModel = mongoose.model('Course', courseSchema)

export default courseModel
