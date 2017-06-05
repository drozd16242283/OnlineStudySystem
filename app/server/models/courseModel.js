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
    courseLink: Number,
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
    newCourse.save(callback)
}

courseSchema.statics.getCoursesCounter = function(callback) {
    this.find({}, callback).sort({ courseLink: -1 }).limit(1)
}

courseSchema.statics.getAllCourses = function(callback) {
    this.find({}, { __v: 0 }, callback)
}


courseSchema.statics.addNewLecture = function(newLecture, callback) {
    this.update(
        { courseName: newLecture.courseName },
        { $push: { "lectures": newLecture } },
        callback
    )
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

const courseModel = mongoose.model('Course', courseSchema)

export default courseModel
