import React from 'react'
import reactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router'

import Header from './components/indexComponent/Header'
import IndexComponent from './components/indexComponent/index'
import CoursesList from './components/coursesComponent/CoursesList'
import Lectures from './components/coursesComponent/Lectures'
import Lecture from './components/coursesComponent/Lecture'
import About from './components/aboutComponent'


const checkAuth = () => {
    if (localStorage.username) browserHistory.push('/courses')
}

reactDOM.render(
    <Router history={browserHistory}>
        <Route component={Header} path="/" >
            <IndexRoute component={IndexComponent} />
            { checkAuth() }
            <Route component={CoursesList} path="courses" />
            <Route component={Lectures} path="/courses/:courseLink">
                <Route component={Lecture} path=":lectureLink" />
            </Route>
            <Route component={About} path="about" />
        </Route>
    </Router>,
    document.getElementById('app')
)
