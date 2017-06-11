import isFormEmpty from './isFormEmpty'
import sendForm from './sendForm'

const validateAndSendCourseForm = (courseForm, inputImage, isAdd) => {
    let uploadLink = isAdd ? '/admin/newcourse' : '/admin/editcourse'
    let resultMessage = {}

    if (isFormEmpty(courseForm)) {
        resultMessage = { error: 'Заповніть форму!' }
    } else if (courseForm.courseName.length > 30) {
        resultMessage = { error: 'Занадто велика назва курсу!' }
    } else if (courseForm.courseDescription.length > 175) {
        resultMessage = { error: 'Занадто великий опис!' }
    } else if (inputImage == null) {
        resultMessage = { error: 'Виберіть зображення!' }
    } else {
        sendForm(courseForm, uploadLink)
        resultMessage = { success: 'Курс створено.' }
    }

    return resultMessage
}

export default validateAndSendCourseForm
