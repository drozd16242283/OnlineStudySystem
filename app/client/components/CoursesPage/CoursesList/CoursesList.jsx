import React from 'react'
import axios from 'axios'
import Link from 'react-router/lib/Link'

import './CoursesList.css'

const CoursesList = React.createClass({
    getInitialState() {
        return {
            coursesList: []
        }
    },
    componentDidMount() {
        axios.get('/courses/getcourses')
            .then(response => this.setState({ coursesList: response.data }))
    },

    render() {
        //this.props.router.push('/courses/r231sOmPlc3Qly4Q')
        let coursesList = this.state.coursesList.map(el => {
            return (
                <div key={el._id} className="col-md-4">
                    <div className="course">
                        <Link to={`/courses/${el.courseLink}`}>
                            <div className="courseLogo">
                                <img src={`coursesIcons/${el.courseImage}`} />
                                <div className="line"></div>
                            </div>
                        </Link>
                        <div className="course-content">
                            <h2>{el.courseName}</h2>
                            <p>{el.courseDescription}</p>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="courses">
                <div className="container">
                    <div className="row">
                        {coursesList}
                    </div>
                </div>
            </div>
        )
    }
})


export default CoursesList
