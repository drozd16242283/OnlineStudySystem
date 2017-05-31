import React from 'react'
import axios from 'axios'
import isFormEmpty from 'server/helpers/forms/isFormEmpty'
import sendForm from 'server/helpers/forms/sendForm'

import './AddLecture.css'

const AddLecture = React.createClass({
    getInitialState() {
        return {
            courses: [],
            message: {}
        }
    },

    componentDidMount() {
        axios.get('/courses/getcourses')
            .then(response => this.setState({ courses: response.data }))
    },

    submitNewLecture() {
        let lectureData = {
            courseName: document.querySelector('.selectCourse').value,
            lectureName: document.querySelector('.inputLectureName').value,
            lectureText: document.querySelector('.lectureText').value,
            isLecture: true
        }

        if (isFormEmpty(lectureData)) {
            this.setState({ message: { error: 'Заповніть форму!' } })
        } else {
            sendForm(lectureData, '/admin/addlecture')
                .then(response => this.setState({ message: response.data }))
        }
    },

    submitMessage() {
        const message = this.state.message

        if (message.error) {
            return <p>{message.error}</p>
        } else if (message.success) {
            setTimeout(() => location.href = '/admin', 300)
            return <img src="icons/tick.png" />
        } else {
            return false
        }
    },

    render() {
        let selectCourse = this.state.courses.map(el => <option>{el.courseName}</option>)
        return (
            <section id="main" className="column">
        		<article className="module width_full">
        			<header><h3>Додати лекцію</h3></header>
        				<div className="module_content">
                            <div className="chooseCourse">
                                <p>Оберіть курс: </p>
                                <select className="selectCourse">{selectCourse}</select>
                            </div>
        					<fieldset>
        						<label>Тема лекції</label>
        						<input type="text" className="inputLectureName" />
        					</fieldset>
        					<fieldset>
        						<label>Текст</label>
        						<textarea rows="12" className="lectureText"></textarea>
        					</fieldset>
        				</div>
        			<footer>
        				<div className="submit_link">
                            {this.submitMessage()}
        					<input type="button" className="alt_btn" value="Опублікувати" onClick={this.submitNewLecture} />
        				</div>
        			</footer>
        		</article>
        	</section>
        )
    }
})

export default AddLecture
