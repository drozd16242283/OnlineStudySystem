import React from 'react'
import reactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import Admin from './components/adminComponent/AdminPanel/AdminComponent'
import AddCourse from './components/adminComponent/AddCourse'
import AddLecture from './components/adminComponent/AddLecture'
import EditCourses from './components/adminComponent/EditCourses'
import ChangeRole from './components/adminComponent/ChangeRole'
import ShowAllUsers from './components/adminComponent/ShowAllUsers'
import Logout from './components/adminComponent/AdminLogout'

reactDOM.render(
    <Router history={browserHistory}>
        <Route component={Admin} path="/admin">
            <Route component={AddCourse} path="/newcourse" />
            <Route component={AddLecture} path="/addlecture" />
            <Route component={EditCourses} path="/edit" />
            <Route component={ChangeRole} path="/changerole" />
            <Route component={ShowAllUsers} path="/users" />
            <Route component={Logout} path="/logout" />
        </Route>
    </Router>,
    document.getElementById('admin')
)
