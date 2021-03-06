import path from 'path'
import userModel from '../../server/models/userModel'
import courseModel from '../../server/models/courseModel'
import rolesToString from '../../server/helpers/role/rolesToString'
import roleToNumber from '../../server/helpers/role/roleToNumber'
import uploadCourseImage from '../../server/helpers/uploads/uploadCourseImage'


export function adminPanel(req, res) {
    const adminFile = path.resolve(__dirname, '../../public', 'admin.html')
    res.sendFile(adminFile)
}

export function addNewCourse(req, res) {
    if (Object.keys(req.body).length === 0) {
        uploadCourseImage(req, res, (err) => {
            if (err) res.sendStatus(503)
        })
    } else {
        const courseData = {
            courseName: req.body.courseName,
            courseImage: req.body.courseImage,
            courseDescription: req.body.courseDescription,
            courseLink: req.body.courseLink
        }

        const newCourse = new courseModel(courseData)
        newCourse.addNewCourse(newCourse, (err, course) => {
            let response = err ? { error: 'Помилка бази даних.' } : { success: 'Курс створено!' }
            res.json(response)
        })
    }
}

export function editCourse(req, res) {
    if (Object.keys(req.body).length === 0) {
        uploadCourseImage(req, res, (err) => {
            err ? res.sendStatus(503) : res.sendStatus(200)
        })
    } else {
        let newCourseData = {
            courseName: req.body.courseName,
            newCourseName: req.body.newCourseName,
            courseImage: req.body.courseImage,
            courseDescription: req.body.courseDescription
        }
        courseModel.editCourse(newCourseData, (err, result) => {
            err ? res.sendStatus(503) : res.sendStatus(200)
        })
    }
}

export function deleteCourse(req, res) {
    courseModel.deleteCourse(req.params.courseLink, (err, result) => {
        if (err) res.sendStatus(500)
        if (result) res.json({ success: 'Курс видалено.' })
    })
}

export function addNewLecture(req, res) {
    let isLecture = req.body.isLecture === 'true'
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
