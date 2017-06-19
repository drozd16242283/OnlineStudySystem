import React from 'react'
import reactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import AdminIndexPage from './components/AdminPage/AdminPanel/AdminIndexPage'
import AddCourse from './components/AdminPage/AddCourse'
import AddLecture from './components/AdminPage/AddLecture'
import EditCourse from './components/AdminPage/EditCourse'
import EditLecture from './components/AdminPage/EditLecture'
import ChangeRole from './components/AdminPage/ChangeRole'
import ShowAllUsers from './components/AdminPage/ShowAllUsers'
import Logout from './components/AdminPage/AdminLogout'

import TextArea from './components/AdminPage/TextArea'

reactDOM.render(
    <Router history={browserHistory}>
        <Route component={AdminIndexPage} path="/admin">
            <Route component={AddCourse} path="/newcourse" />
            <Route component={AddLecture} path="/addlecture" />
            <Route component={EditCourse} path="/editcourse" />
            <Route component={EditLecture} path="/editlecture" />
            <Route component={ChangeRole} path="/changerole" />
            <Route component={ShowAllUsers} path="/users" />
            <Route component={Logout} path="/logout" />
            <Route component={TextArea} path="/textarea" />
        </Route>
    </Router>,
    document.getElementById('admin')
)
