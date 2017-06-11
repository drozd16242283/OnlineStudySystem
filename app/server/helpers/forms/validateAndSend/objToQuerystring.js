let urlString = (formData) => {
    return Object.keys(formData).map(el => {
        return `${encodeURIComponent(el)}=${encodeURIComponent(formData[el])}`
    }).join('&')
}

export default urlString
