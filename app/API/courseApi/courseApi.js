import courseModel from '../../server/models/courseModel'

export function showCoursesPage(req, res) {
    res.redirect('/')
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
        let response = (lecturesList.length)
            ? lecturesList[0].lectures
            : { error: 'Лекції не знайдено.' }
        res.json(response)
    })
}

export function getCurrentLecture(req, res) {
    courseModel.getCurrentLecture(req.params.lectureLink, (err, lecture) => {
        if (err) return res.sendStatus(500)
        lecture ? res.json(lecture) : res.redirect('/courses')
        //res.json(lecture)
    })

}
