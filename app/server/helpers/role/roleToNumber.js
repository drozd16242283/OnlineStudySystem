const roleInNumber = (role) => {
    switch(role) {
        case 'Адміністратор':
            return 1
            break
        case 'Вчитель':
            return 2
            break
        case 'Учень':
            return 3
            break
        default:
            return false
    }
}

export default roleInNumber
