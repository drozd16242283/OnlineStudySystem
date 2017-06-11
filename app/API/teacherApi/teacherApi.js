import path from 'path'
import practicalModel from '../../server/models/practicalModel'

export function showTeacherPage(req, res) {
    const teacherPageFile = path.resolve(__dirname, '../../public', 'teacher.html')
    res.sendFile(teacherPageFile)
}

export function submitPracticalMarks(req, res) {
    practicalModel.submitPracticalMarks(req.body, (err, result) => {
        let response = err ? { error: 'Помилка бази даних.' } : { markskUpdated: 'Оцінки оновлено.' }
        res.json(response)
    })
}

export function downloadPractical(req, res) {
    let fileName = req.params.practical
    let filePath = `app/public/practicals/${fileName}`
    res.download(filePath)
}
