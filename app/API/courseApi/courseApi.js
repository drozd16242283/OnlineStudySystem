import courseModel from '../../server/models/courseModel'

export function showCoursesPage(req, res) {
    res.redirect('/')
}

export function getAllCourses(req, res) {
    courseModel.find({},
    { comments: 0, lectures: 0, __v: 0 },
    (err, courseList) => {
        if (err) res.sendStatus(500)

        res.json(courseList)
    })
}
