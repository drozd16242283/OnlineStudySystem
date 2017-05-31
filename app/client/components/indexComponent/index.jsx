import React from 'react'

import SignIn from './Authentication/SignIn'
import SignUp from './Authentication/SignUp'
import Welcome from './Welcome'

import * as showForm from 'server/helpers/forms/showForm'


const IndexComponent = () => {
	return (
		<div className="startingPage">
			<Welcome showLoginForm={showForm.login}
					 showRegisterForm={showForm.register} />
			<SignIn />
			<SignUp />
		</div>
	)
}


export default IndexComponent
