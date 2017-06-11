const isArchive = (type) => {
    let archiveTypes = ['zip', 'gzip', 'x-rar', 'x-rar-compressed', 'x-7z-compressed']
    let currentArchiveType = type.substr(12, type.length)

    return (archiveTypes.includes(currentArchiveType))
}

export default isArchive
