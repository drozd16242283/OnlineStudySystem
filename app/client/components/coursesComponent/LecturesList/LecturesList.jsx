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
        let url = `/courses/getlectures/${this.props.params.courseLink}`
        axios.get(url)
            .then(response => this.setState({ lecturesList: response.data }))
    },

    getLecturesList() {
        let courseLink = this.props.params.courseLink
        let courseCount = 1
        let lecturesList = this.state.lecturesList.map(el => {
            return (
                <li className="list-group-item lecture">
                    <span>{courseCount++}.</span>
                    <Link to={`/courses/${courseLink}/${el.lectureLink}`}>{el.lectureName}</Link>
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
                    </ul>
                </div>
            </div>
        )
    }
})

export default LecturesList
