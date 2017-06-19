import React from 'react'

import LecturesList from './LecturesList'
import Comments from './Comments'

const LecturesListWrap = props => {
    const { courseLink, lectureLink } = props.params
    let CommentsList = (props.children != null)
        ? <Comments courseLink={courseLink} lectureLink={lectureLink} />
        : false

    return (
        <div className="container lectures_container">
            <div className="row">
                <div className="col-sm-4">
                    <LecturesList courseLink={courseLink} />
                </div>
                <div className="col-sm-8">{props.children}</div>
            </div>
            <div className="row">
                <div className="col-sm-offset-1 col-sm-10">{CommentsList}</div>
            </div>
        </div>
    )
}

export default LecturesListWrap
