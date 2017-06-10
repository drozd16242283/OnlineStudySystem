import multer from '../../libs/multer'

let uploadDirectory = 'app/public/coursesIcons'
let inputName = 'courseImage'

let uploadCourseImage = multer(uploadDirectory, inputName)

export default uploadCourseImage
