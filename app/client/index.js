import React from 'react'
import reactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import Header from './components/IndexPage/Header'
import IndexPage from './components/IndexPage'
import CoursesList from './components/CoursesPage/CoursesList'
import LecturesListWrap from './components/CoursesPage/LecturesListWrap'
import Lecture from './components/CoursesPage/Lecture'
import Marks from './components/IndexPage/Marks'


const checkAuth = () => {
    if (localStorage.username) browserHistory.push('/courses')
}

reactDOM.render(
    <Router history={browserHistory}>
        <Route component={Header} path="/" >
            <IndexRoute component={IndexPage} />
            { checkAuth() }
            <Route component={CoursesList} path="courses" />
            <Route component={LecturesListWrap} path="/courses/:courseLink">
                <Route component={Lecture} path=":lectureLink" />
            </Route>
            <Route component={Marks} path="marks" />
        </Route>
    </Router>,
    document.getElementById('app')
)
