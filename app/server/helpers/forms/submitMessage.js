import React from 'react'

const submitMessage = (message) => {
    if (message.error) {
        return <p>{message.error}</p>
    } else if (message.success) {
        setTimeout(() => location.href = '/admin', 300)
        return <img src="images/tick.png" />
    } else {
        return false
    }
}

export default submitMessage
