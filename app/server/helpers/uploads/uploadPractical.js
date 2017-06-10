import multer from '../../libs/multer'

let uploadDirectory = 'app/public/practicals'
let inputName = ''

let uploadPracticals = multer(uploadDirectory, inputName)

export default uploadPracticals
