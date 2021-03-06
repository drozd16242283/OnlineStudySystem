import React from 'react'
import axios from 'axios'
import LectureForm from 'server/helpers/forms/validateAndSend/LectureForm'
import submitMessage from 'server/helpers/forms/submitMessage'

import TextArea from '../TextArea'

import './AddLecture.css'

const AddLecture = React.createClass({
    getInitialState() {
        return {
            courses: [],
            message: {}
        }
    },

    componentDidMount() {
        document.getElementById('RadioLecture').checked = true
        axios.get('/courses/getcourses')
            .then(response => this.setState({ courses: response.data }))
    },

    getLecturesCounter() {
        let lectureCounter = 0

        let currentLecturesList = this.state.courses.filter(el => {
            return el.courseName == document.querySelector('.selectCourse').value
        }).map(el => el.lectures)
        currentLecturesList[0].forEach(el => {
            lectureCounter = el.lectureLink
        })

        return lectureCounter
    },

    submitNewLecture() {
        let lectureCounter = this.getLecturesCounter()

        let lectureData = {
            courseName: document.querySelector('.selectCourse').value,
            lectureName: document.querySelector('.inputLectureName').value,
            lectureText: document.querySelector('.lectureText').value,
            lectureLink: ++lectureCounter,
            isLecture: document.getElementById('RadioLecture').checked
        }

        let responseMessage = LectureForm(lectureData, 'add')
        this.setState({ message: responseMessage })
    },

    render() {
        let selectCourse = this.state.courses.map(el => <option>{el.courseName}</option>)
        return (
            <div className="container">
                <section id="addLecture">
            		<article className="addLecture_module">
            			<header><h3>Додати лекцію або практичну</h3></header>
            				<div className="addLecture_module_content">
                                <div className="row">
                                    <div className="col-xs-8 col-sm-6 chooseCourse">
                                        <fieldset>
                                            <label>Виберіть курс: </label>
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
                                        <textarea rows="12" className="lectureText" />
                        
                                    </fieldset>
                                </div>
                			</div>
                		<footer>
                			<div className="addLecture_submit_button">
                                {submitMessage(this.state.message)}
                				<input type="button" value="Опублікувати" onClick={this.submitNewLecture} />
                			</div>
                		</footer>
            		</article>
            	</section>
            </div>
        )
    }
})

export default AddLecture
