import React from 'react'
import axios from 'axios'

import Comments from '../Comments'

import './Lecture.css'

const Lecture = React.createClass({
    getInitialState() {
        return {
            lecture: {},
            comments: {}
        }
    },

    componentDidMount() {
        let url = `/courses/getlectures/${this.props.params.courseLink}/${this.props.params.lectureLink}`
        axios.get(url)
            .then(response => this.setState(
                { lecture: response.data.lectures[0], comments: response.data.comments[0] }
            ))
    },

    render() {
        let lecture = this.state.lecture
        let isLecture = lecture.isLecture
        return (
            <div className="container lectureBlock">
                <h1>{lecture.lectureName}</h1>
                <p>{lecture.lectureText}</p>
                <Comments comments={this.state.comments} />
            </div>
        )
    }
})

export default Lecture
