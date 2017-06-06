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

courseSchema.statics.editCourse = function(newCourseData, callback) {
    this.update(
        { courseName: newCourseData.courseName },
        { $set:
            {
                courseName: newCourseData.newCourseName,
                courseDescription: newCourseData.courseDescription
            }
        },
        callback
    )
}

courseSchema.statics.deleteCourse = function(courseLink, callback) {
    this.remove({ courseLink: courseLink }, callback)
}


courseSchema.statics.addNewLecture = function(courseName, lectureData, callback) {
    this.update(
        { courseName: courseName },
        { $push: { "lectures": lectureData } },
        callback
    )
}

courseSchema.statics.getAllLectures = function(courseLink, callback) {
    this.find({ courseLink: courseLink }, { _id: 0, lectures: 1 }, callback)
}

courseSchema.statics.getCurrentLecture = function(courseLink, lectureLink, callback) {
    this.findOne(
        { courseLink: courseLink },
        { comments: 1, lectures: { $elemMatch: { lectureLink: lectureLink } }  },
        callback
    )
}

courseSchema.statics.editLecture = function(newLectureData, callback) {
    this.update(
        {
            courseName: newLectureData.courseName,
            "lectures.lectureName": newLectureData.lectureName
        },
        { $set:
            {
                "lectures.$.lectureName": newLectureData.newLectureName,
                "lectures.$.lectureText": newLectureData.lectureText
            }
        },
        callback
    )
}

courseSchema.statics.deleteLecture = function(courseLink, lectureLink, callback) {
    this.update(
        { courseLink: courseLink },
        { $pull: { lectures: { lectureLink: lectureLink } }},
        callback
    )
}

const courseModel = mongoose.model('Course', courseSchema)

export default courseModel
