const isImage = (type) => {
    let imageType = type.substr(0, 5);
    let result = (imageType === 'image') ? true : false

    return result
}

export default isImage
