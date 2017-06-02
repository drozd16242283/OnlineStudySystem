import randomToken from 'rand-token'
import mongoose from '../libs/mongoose'

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

courseSchema.statics.getAllCourses = function(callback) {
    this.find({}, { lectures: 0, __v: 0 }, callback)
}

courseSchema.statics.getAllLectures = function(courseLink, callback) {
    this.find({ courseLink: courseLink }, { _id: 0, lectures: 1 }, callback)
}

courseSchema.statics.getCurrentLecture = function(lectureLink, callback) {
    this.findOne(
        { "lectures.lectureLink": lectureLink },
        { comments: 1, lectures: { $elemMatch: { lectureLink: lectureLink } }  },
        callback
    )
}

courseSchema.methods.addNewCourse = function(newCourse, callback) {
    let link = randomToken.generate(16)

    //let link = encodeURIComponent(newCourse.courseName.toLowerCase().trim()) + randomToken.generate(16)
    newCourse.courseLink = link

    newCourse.save(callback)
}

courseSchema.statics.addNewLecture = function(newLecture, callback) {
    let link = randomToken.generate(16)
    //let link = encodeURIComponent(newLecture.lectureName.toLowerCase().trim()) + randomToken.generate(16)
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
