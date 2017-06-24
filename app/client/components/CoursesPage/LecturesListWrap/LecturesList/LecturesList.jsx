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
        let lecturesList = this.state.lecturesList.map(lecture => {
            const courseLink = this.props.courseLink
            let ArrayOfLectureLinks = lecture.lectureBody.map(lectureBody => lectureBody.lectureLink)
            let isLecturesArray = lecture.lectureBody.map(lectureBody => lectureBody.isLecture)

            let firstLinkLectureType = (isLecturesArray[0]) ? 'Лекція' : 'Практична'
            let secoundLinkLectureType = (isLecturesArray[1]) ? 'Лекція' : 'Практична'

            let firstLink = (ArrayOfLectureLinks.length > 0)
                ? <h5><Link to={`/courses/${courseLink}/${ArrayOfLectureLinks[0]}`}>{firstLinkLectureType}</Link></h5>
                : false
            let secoundLink = (ArrayOfLectureLinks.length === 2)
                ? <h5><Link to={`/courses/${courseLink}/${ArrayOfLectureLinks[1]}`}>{secoundLinkLectureType}</Link></h5>
                : false

            return (
                <li className="lecture">
                    <h4>{lecture.lectureName}</h4>
                    {firstLink}
                    {secoundLink}
                </li>
            )
        })
        return lecturesList
    },

    render() {
        const lecturesList = (this.state.lecturesList.length > 0)
            ? this.getLecturesList()
            : <h5>Для даного курсу поки немає лекцій.</h5>

        return (
            <div className="lecturesBlock">
                <div className="lecturesList">
                    <ul>
                        {lecturesList}
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }
})

export default LecturesList
