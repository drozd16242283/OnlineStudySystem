import path from 'path'
import userModel from '../../server/models/userModel'
import courseModel from '../../server/models/courseModel'
import rolesToString from '../../server/helpers/role/rolesToString'
import roleToNumber from '../../server/helpers/role/roleToNumber'


const adminFile = path.resolve(__dirname, '../../public', 'admin.html')

export function adminPanel(req, res) {
    res.sendFile(adminFile)
}

export function getAllUsers(req, res) {
    userModel.getAllUsers((err, usersList) => {
        let response = err ? { error: 'Помилка бази даних.' } : rolesToString(usersList)
        res.json(response)
    })
}

export function changeUserRole(req, res) {
    let roleData = {
        username: req.body.userName,
        role: roleToNumber(req.body.role)
    }
    userModel.changeUserRole(roleData, (err, user) => {
        let response = err ? { error: 'Помилка бази даних.' } : user.nModified
        res.json(response)
    })
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

export function editCourse(req, res) {

}

export function addNewLecture(req, res) {
    let lectureData = {
        courseName: req.body.courseName,
        lectureName: req.body.lectureName,
        lectureText: req.body.lectureText,
        isLecture: req.body.isLecture
    }
    courseModel.addNewLecture(lectureData, (err, result) => {
        let response = err ? { error: 'Помилка бази даних.' } : { success: 'Лекцію створено.' }
        res.json(response)
    })
}
