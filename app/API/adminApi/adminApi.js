import path from 'path'
import userModel from '../../server/models/userModel'
import courseModel from '../../server/models/courseModel'
import changeRoles from '../../server/helpers/role/changeRoles'
import roleToNumber from '../../server/helpers/role/roleToNumber'

const adminFile = path.resolve(__dirname, '../../public', 'admin.html')

export function adminPanel(req, res) {
    res.sendFile(adminFile)
}

export function addNewCourse(req, res) {
    let courseData = {
        courseName: req.body.courseName,
        courseImage: req.body.courseImage,
        courseDescription: req.body.courseDescription
    }
    let newCourse = new courseModel(courseData)
    newCourse.addNewCourse(newCourse, (err, course) => {
        let response = err ? { error: 'Помилка бази даних.' } : { success: 'Курс створено.' }
        res.json(response)
    })
}

export function addNewLecture(req, res) {
    let lectureData = {
        courseName: req.body.courseName,
        lectureName: req.body.lectureName,
        lectureText: req.body.lectureText,
        isLecture: true
    }
    courseModel.addNewLecture(lectureData, (err, result) => {
        let response = err ? { error: 'Помилка бази даних.' } : { success: 'Лекцію створено.' }
        res.json(response)
    })
}

export function changeRole(req, res) {
    let userName = req.body.userName
    let role = roleToNumber(req.body.role)
    userModel.update(
        { username: userName },
        { $set: { "role": role }},
        (err, user) => {
            let response = err ? { error: 'Помилка бази даних.' } : user.nModified
            res.json(response)
        }
    )
}

export function getAllUsers(req, res) {
    userModel.find({},
        { password: 0, __v: 0 },
        (err, usersList) => {
            let response = err ? { error: 'Помилка бази даних.' } : changeRoles(usersList)
            res.json(response)
        }
    )
}
