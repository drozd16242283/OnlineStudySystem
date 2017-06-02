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
        document.getElementById('RadioLecture').checked = true
        let lectureData = {
            courseName: document.querySelector('.selectCourse').value,
            lectureName: document.querySelector('.inputLectureName').value,
            lectureText: document.querySelector('.lectureText').value,
            isLecture: document.getElementById('RadioLecture').checked
        }

        if (isFormEmpty(lectureData)) {
            this.setState({ message: { error: 'Заповніть форму!' } })
        } else if (lectureData.lectureName.length > 40) {
            this.setState({ message: { error: 'Занадто велика назва лекції!' } })
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
            <div className="container">
                <section id="main" className="column">
            		<article className="module">
            			<header><h3>Додати лекцію або практичну</h3></header>
            				<div className="module_content">
                                <div className="row">
                                    <div className="col-xs-8 col-sm-6 chooseCourse">
                                        <fieldset>
                                            <label>Оберіть курс: </label>
                                            <select className="selectCourse">{selectCourse}</select>
                                        </fieldset>
                                    </div>
                                    <div className="col-xs-8 col-sm-5 lectureType">
                                        <div className="row">
                                            <fieldset>
                                                <div className="col-xs-8 col-md-6 lectureRadio">
                                                    <input type="radio" id="RadioLecture" name="group1" />
                                                    <label for="RadioLecture">Лекція</label>
                                                </div>
                                                <div className="col-xs-8 col-md-6 practicalRadio">
                                                    <input type="radio" id="RadioPractical" name="group1" />
                                                    <label for="RadioPractical">Практична</label>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                                <div className="lectureTheme">
                                    <fieldset>
                                        <label>Тема лекції</label>
                                        <input type="text" className="inputLectureName" />
                                    </fieldset>
                                </div>
                			    <div className="lectureBody">
                                    <fieldset>
                                        <label>Текст</label>
                                        <textarea rows="12" className="lectureText"></textarea>
                                    </fieldset>
                                </div>
                			</div>
                		<footer>
                			<div className="submit_link">
                                {this.submitMessage()}
                				<input type="button" className="alt_btn" value="Опублікувати" onClick={this.submitNewLecture} />
                			</div>
                		</footer>
            		</article>
            	</section>
            </div>
        )
    }
})

export default AddLecture
