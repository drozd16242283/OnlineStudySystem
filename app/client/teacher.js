import React from 'react'
import reactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import Header from './components/indexComponent/Header'
import TeacherPage from './components/teacherComponent/TeacherPage'

reactDOM.render(
    <Router history={browserHistory}>
        <Route component={Header} path="/teacher">
            <IndexRoute component={TeacherPage} />
        </Route>
    </Router>,
    document.getElementById('teacher')
)
