import multer from 'multer'

const createStorage = (uploadDirectory, inputName) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, uploadDirectory),
        filename:    (req, file, cb) => cb(null, file.originalname)
    })

    let uploadStorage = multer({ storage: storage }).single(inputName)

    return uploadStorage
}


export default createStorage
