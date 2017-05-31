const isFormEmpty = (formData) => {
    let empty = false
    Object.values(formData).map(el => {
        if(!el) empty = true
    })
    return empty
}

export default isFormEmpty
