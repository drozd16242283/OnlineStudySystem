import isFormEmpty from './isFormEmpty'
import sendForm from './sendForm'

const validateAndSendLectureForm = (lectureForm, inputImage, isAdd) => {
    let uploadLink = isAdd ? '/admin/addlecture' : '/admin/editlecture'
    let resultMessage = {}

    if (isFormEmpty(lectureForm)) {
        resultMessage = { error: 'Заповніть форму!' }
    } else if (lectureForm.lectureName.length > 40) {
        resultMessage = { error: 'Занадто велика назва лекції!' }
    } else if (lectureForm.lectureText.length > 10000) {
        resultMessage = { error: 'Занадто велике тіло лекції!' }
    } else {
        sendForm(lectureForm, uploadLink)
        resultMessage = { success: 'Лекцію створено.' }
    }

    return resultMessage
}

export default validateAndSendLectureForm
