import React from 'react'

import './Comments.css'

const Comments = props => {
    return (
        <div className="commentBlock">
            <h4>Коментарі</h4>
            <hr />
            <textarea rows="4"></textarea>
            <div className="pull-right submitBlock">
                <button type="button" className="btn btn-success submitComment">Додати коментар</button>
            </div>
        </div>
    )
}

export default Comments
