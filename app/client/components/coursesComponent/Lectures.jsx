import React from 'react'

import LecturesList from './LecturesList'

const Lectures = React.createClass({
    render() {
        let linkToCourse = this.props.params.courseLink
        return (
            <div>
                <LecturesList  linkToCourses={`courses/${linkToCourse}`} courseLink={linkToCourse} />
                {this.props.children}
            </div>
        )
    }
})

export default Lectures
