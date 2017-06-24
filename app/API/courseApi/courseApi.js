import courseModel from '../../server/models/courseModel'
import practicalModel from '../../server/models/practicalModel'
import uploadPracticalArchive from '../../server/helpers/uploads/uploadPractical'

export function showCoursesPage(req, res) {
    res.redirect('/')
}

export function getCoursesCounter(req, res) {
    courseModel.getCoursesCounter((err, response) => {
        if (err) res.sendStatus(500)
        if (response) res.json(response)
    })
}

export function getAllCourses(req, res) {
    courseModel.getAllCourses((err, coursesList) => {
        let response = err ? { error: 'Помилка бази даних.' } : coursesList
        res.json(response)
    })
}

export function getLecturesList(req, res) {
    courseModel.getAllLectures(req.params.courseLink, (err, lecturesList) => {
        if (err) return res.sendStatus(500)
        let result = (lecturesList.length)
            ? lecturesList[0].lectures
            : { error: 'Лекції не знайдено.' }

        let sortedLecturesList = result
            .map(el => el)
            .reduce((lecture, line) => {
                lecture[line.lectureName] = lecture[line.lectureName] || []
                if (lecture[line.lectureName].length < 2) {
                    lecture[line.lectureName].push({
                        isLecture: line.isLecture,
                        lectureLink: line.lectureLink
                    })
                }
                return lecture
            }, {})

        let responseArray = []
        for (let item in sortedLecturesList) {
            responseArray.push({
                lectureName: item,
                lectureBody: sortedLecturesList[item]
            })
        }
        res.json(responseArray)
    })
}

export function getCurrentLecture(req, res) {
    let courseLink = +req.params.courseLink
    let lectureLink = +req.params.lectureLink
    courseModel.getCurrentLecture(courseLink, lectureLink, (err, lecture) => {
        if (err) return res.sendStatus(500)
        lecture ? res.json(lecture) : res.redirect('/courses')
    })

}

export function uploadPractical(req, res) {
    uploadPracticalArchive(req, res, (err) => {
        if (err) res.sendStatus(503)

        let practicalData = {
            userName: req.body.userName,
            practicalName: req.body.practicalName,
            fileName: req.file.filename,
            mark: 0,
            fileDestination: req.file.destination,
            filePath: req.file.path
        }

        let newPractical = new practicalModel(practicalData)
        newPractical.addNewPractical(newPractical, (err, practical) => {
            let response = err ? { error: 'Помилка бази даних.' } : { success: 'Практичну додано.' }
            res.json(response)
        })

    })
}

export function getAllPracticals(req, res) {
    practicalModel.getAllPracticals((err, practicalsList) => {
        let response = err ? { error: 'Помилка бази даних.' } : practicalsList
        res.json(response)
    })
}

export function addComment(req, res) {
    let commentData = {
        author: req.body.userName,
        commentText: req.body.commentText,
        lectureLink: +req.body.lectureLink
    }

    courseModel.addComment(+req.body.courseLink, commentData, (err, result) => {
        let response = err ? { error: 'Помилка бази даних.' } : { commentAdded: 'Коментар додано.' }
        res.json(response)
    })
}
