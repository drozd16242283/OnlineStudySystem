import React from 'react'
import reactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'


import Header from './components/indexComponent/Header'
import IndexComponent from './components/indexComponent/index'
import CoursesList from './components/coursesComponent/CoursesList'
import LecturesList from './components/coursesComponent/LecturesList'
import Lecture from './components/coursesComponent/Lecture'
import About from './components/aboutComponent'


const checkAuth = () => {
    if (localStorage.username) browserHistory.push('/courses')
}

const test = () => {
    browserHistory.push('/courses/r231sOmPlc3Qly4Q')
}

reactDOM.render (
    <Router history={browserHistory}>
        <Route component={Header} path="/" >
            <IndexRoute component={IndexComponent} />
            { checkAuth() }
            <Route component={CoursesList} path="courses" />
            <Route component={LecturesList} path="courses/:courseLink" />
            <Route component={Lecture} path="courses/:courseLink/:lectureLink" />
            <Route component={About} path="about" />
        </Route>
    </Router>,
    document.getElementById('app')
)
