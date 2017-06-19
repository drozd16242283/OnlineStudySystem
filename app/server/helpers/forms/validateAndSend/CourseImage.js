import axios from 'axios'
import isImage from '../isImage'

const validateAndSendCourseImage = (formWithImage, addOrEdit) => {
    const uploadLink = (addOrEdit == 'add') ? '/admin/newcourse' : '/admin/editcourse'
    let responseMessage = {}

    let formData = new FormData()
    formData.append('courseImage', formWithImage)

    if (isImage(formWithImage.type)) {
        document.querySelector('.submitCourseImgMessage').classList.add('show')
        axios.post(uploadLink, formData)
        responseMessage = { imgUploadSuccess: 'Зображення загружено' }
    } else {
        responseMessage = { error: 'Виберіть зображення!' }
    }

    return responseMessage
}

export default validateAndSendCourseImage
