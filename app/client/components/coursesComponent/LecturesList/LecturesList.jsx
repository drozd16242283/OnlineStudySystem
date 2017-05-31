import React from 'react'

import './LecturesList.css'

const LecturesList = React.createClass({
    componentDidMount() {
        
    },

    render() {
        let lectures;
        return (
            <div className="lecturesBlock">
                <h3>Lectures List</h3>
                <p>{this.props.params.courselink}</p>
            </div>
        )
    }
})

export default LecturesList
