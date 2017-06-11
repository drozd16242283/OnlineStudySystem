import isFormEmpty from './isFormEmpty'
import sendForm from './sendForm'

const validateAndSendCommentForm = (commentForm) => {
    let response = {}

    if (isFormEmpty(commentForm)) {
        response = { error: 'Заповніть форму!' }
    } else if (commentForm.commentText.length > 500) {
        response = { error: 'Занадто великий коментар.' }
    } else {
        sendForm(commentForm, '/courses/addcomment')
        response = { commentAdded: 'Коментар додано.' }
    }

    return response
}

export default validateAndSendCommentForm
