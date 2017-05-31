const changeRoles = (usersList) => {
    let response = []

    for (var key in usersList) {
        let obj = {
            _id : usersList[key]._id,
            role: 'Учень',
            email: usersList[key].email,
            username: usersList[key].username
        }

        if (usersList[key].role === 1) {
            obj.role = 'Адміністратор'
        } else if (usersList[key].role === 2) {
            obj.role = 'Вчитель'
        }

        response.push(obj)
    }
    return response
}

export default changeRoles
