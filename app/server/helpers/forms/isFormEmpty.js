const isFormEmpty = (formData) => {
    let empty = false
    Object.values(formData).map(el => {
        if(el.length < 1) empty = true
    })
    return empty
}

export default isFormEmpty
