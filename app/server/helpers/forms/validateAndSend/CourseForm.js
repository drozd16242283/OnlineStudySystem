import isFormEmpty from './isFormEmpty'
import sendForm from './sendForm'

const validateAndSendCourseForm = (courseData, courseImage, addOrEdit) => {
    const uploadLink = (addOrEdit == 'add') ? '/admin/newcourse' : '/admin/editcourse'
    let resultMessage = {}

    if (isFormEmpty(courseData)) {
        resultMessage = { error: 'Заповніть форму!' }
    } else if (courseData.courseName.length > 30) {
        resultMessage = { error: 'Занадто велика назва курсу!' }
    } else if (courseData.courseDescription.length > 175) {
        resultMessage = { error: 'Занадто великий опис!' }
    } else if (courseImage == null) {
        resultMessage = { error: 'Виберіть зображення!' }
    } else {
        sendForm(courseData, uploadLink)
        resultMessage = { success: 'Курс створено.' }
    }

    return resultMessage
}

export default validateAndSendCourseForm
