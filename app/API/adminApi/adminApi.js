import path from 'path'
import userModel from '../../server/models/userModel'
import courseModel from '../../server/models/courseModel'
import rolesToString from '../../server/helpers/role/rolesToString'
import roleToNumber from '../../server/helpers/role/roleToNumber'
import uploadCourseImage from '../../server/helpers/uploads/uploadCourseImage'
import isImage from '../../server/helpers/isImage'


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
        let response = err ? { error: 'Помилка бази даних.' } : { success: 'Роль користувача змінено.' }
        res.json(response)
    })
}

export function addNewCourse(req, res) {
    if (Object.keys(req.body).length === 0) {
        uploadCourseImage(req, res, (err) => {
            if (err) res.sendStatus(503)
            if (!isImage(req.file.mimetype)) {
                res.json({ error: 'Виберіть картинку.' })
            }
        })
    } else {
        let courseData = {
            courseName: req.body.courseName,
            courseImage: req.body.courseImage,
            courseDescription: req.body.courseDescription,
            courseLink: req.body.courseLink
        }

        let newCourse = new courseModel(courseData)
        newCourse.addNewCourse(newCourse, (err, course) => {
            let response = err ? { error: 'Помилка бази даних.' } : { success: 'Курс створено.' }
            res.json(response)
        })
    }
}

export function editCourse(req, res) {
    let newCourseData = {
        courseName: req.body.courseName,
        newCourseName: req.body.newCourseName,
        courseDescription: req.body.courseDescription
    }
    courseModel.editCourse(newCourseData, (err, result) => {
        let response = err ? { error: 'Помилка бази даних.' } : { success: 'Курс оновлено.' }
        res.json(response)
    })
}

export function deleteCourse(req, res) {
    courseModel.deleteCourse(req.params.courseLink, (err, result) => {
        if (err) res.sendStatus(500)
        if (result) res.json({ success: 'Курс видалено.' })
    })
}

export function addNewLecture(req, res) {
    let isLecture = (req.body.isLecture == 'false') ? false : true
    let lectureData = {
        lectureName: req.body.lectureName,
        lectureText: req.body.lectureText,
        lectureLink: +req.body.lectureLink,
        isLecture: isLecture
    }
    courseModel.addNewLecture(req.body.courseName, lectureData, (err, result) => {
        let response = err ? { error: 'Помилка бази даних.' } : { success: 'Лекцію створено.' }
        res.json(response)
    })
}

export function editLecture(req, res) {
    courseModel.editLecture(req.body, (err, result) => {
        if (err) res.sendStatus(500)
        if (result) res.json({ success: 'Лекцію редаговано.' })
    })
}

export function deleteLecture(req, res) {
    let courseLink = +req.params.courseLink
    let lectureLink = +req.params.lectureLink
    courseModel.deleteLecture(courseLink, lectureLink, (err, result) => {
        if (err) res.sendStatus(500)
        if (result) res.json({ success: 'Лекцію видалено.' })
    })
}
