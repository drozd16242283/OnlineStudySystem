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
        let url = `/courses/getlectures/${this.props.courseLink}` //${this.props.courseLink}
        axios.get(url)
            .then(response => this.setState({ lecturesList: response.data }))
    },


    getLecturesList() {
        let courseLink = this.props.courseLink
        let courseCount = 1
        let lecturesList = this.state.lecturesList.map(el => {
            let isLecture = !el.isLecture ? <h5>Практична</h5> : false
            return (
                <li className="list-group-item lecture">
                    <span>{courseCount++}.</span>
                    {isLecture}
                    <Link to={`/${this.props.linkToCourses}/${el.lectureLink}`}>{el.lectureName}</Link>
                </li>
            )
        })
        return (lecturesList.length !== 0)
            ? lecturesList
            : <p>Для цього курсу поки немає лекцій.</p>
    },

    render() {
        return (
            <div className="container lecturesBlock">
                <div className="col-xs-8 col-md-offset-2 lecturesList">
                    <h3>Список доступних лекцій: </h3>
                    <ul className="list-group">
                        {this.getLecturesList()}
                        {this.props.children}

                    </ul>
                </div>
            </div>
        )
    }
})

export default LecturesList
