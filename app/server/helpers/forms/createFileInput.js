const createFileInput = () => {
    let oldInput = document.querySelector('input[name="courseImage"]')
    if (oldInput != null) {
        oldInput.parentElement.removeChild(oldInput)
    }

    let inputUploader = document.createElement('input')
        inputUploader.type = 'file'
        inputUploader.name = 'courseImage'
        inputUploader.classList.add('hide')

    return inputUploader
}

export default createFileInput
