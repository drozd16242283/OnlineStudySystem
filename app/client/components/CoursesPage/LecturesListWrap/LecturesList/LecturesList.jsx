import React from 'react'
import axios from 'axios'
import Link from 'react-router/lib/Link'

import './LecturesList.css'

const LecturesList = React.createClass({
    getInitialState() {
        return {
            lecturesList: []
        }
    },

    componentDidMount() {
        let url = `/courses/getlectures/${this.props.courseLink}`
        axios.get(url)
            .then(response => this.setState({ lecturesList: response.data }))
    },

    getLecturesList() {
        let courseLink = this.props.courseLink
        let lecturesList = this.state.lecturesList.map(el => {
            let lectureLink = el.lectureBody.map(lecture => lecture.lectureLink)
            let isLecture = el.lectureBody.map(lecture => lecture.isLecture)

            let lectureType = ''
            let firstLink = false
            let secoundLink = false

            if (lectureLink.length === 1) {
                lectureType = (isLecture[0]) ? 'Лекція' : 'Практична'
                firstLink = <h5><Link to={`/courses/${courseLink}/${lectureLink[0]}`}>{lectureType}</Link></h5>
            } else if (lectureLink.length === 2) {
                lectureType = (isLecture[0]) ? 'Лекція' : 'Практична'
                firstLink = <h5><Link to={`/courses/${courseLink}/${lectureLink[0]}`}>{lectureType}</Link></h5>
                lectureType = (isLecture[1]) ? 'Лекція' : 'Практична'
                secoundLink = <h5><Link to={`/courses/${courseLink}/${lectureLink[1]}`}>{lectureType}</Link></h5>
            }

            return (
                <li className="lecture">
                    <h4>{el.lectureName}</h4>
                    {firstLink}
                    {secoundLink}
                </li>
            )
        })
        return lecturesList
    },

    render() {
        return (
            <div className="lecturesBlock">
                <div className="lecturesList">
                    <ul>
                        {this.getLecturesList()}
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }
})

export default LecturesList
