import React from 'react'
import axios from 'axios'
import validateAndSendLectureForm from 'server/helpers/forms/validateAndSend/validateAndSendLectureForm'
import submitMessage from 'server/helpers/forms/submitMessage'

import './EditLecture.css'

const EditLecture = React.createClass({
    getInitialState() {
        return {
            coursesList: [],
            lecturesList: [],
            message: {}
        }
    },

    componentDidMount() {
        axios.get('/courses/getcourses')
            .then(response => this.setState({ coursesList: response.data }))
    },

    showLecturesSelect() {
        document.querySelector('.selectLecture_edit').classList.remove('hide')

        let selectedCourse = this.state.coursesList.filter(el => {
            return el.courseName == document.querySelector('.selectCourse_edit select').value
        }).map(el => el.lectures)[0]

        this.setState({ lecturesList: selectedCourse })
    },

    showEditForm() {
        document.querySelector('.module').classList.remove('hide')
    },

    submitEditLecture() {
        let editLecture = {
            courseName: document.querySelector('.selectCourse_edit select').value,
            lectureName: document.querySelector('.selectLecture_edit select').value,
            newLectureName: document.querySelector('.editLectureName').value,
            lectureText: document.querySelector('.editlectureText').value
        }

        let responseMessage = validateAndSendLectureForm(editLecture, true, false)
        this.setState({ message: responseMessage })
    },

    deleteLecture() {
        let courseLink = this.state.coursesList.filter(el => {
            return el.courseName == document.querySelector('.selectCourse_edit select').value
        }).map(el => el.courseLink)[0]
        let lectureLink = this.state.lecturesList.filter(el => {
            return el.lectureName == document.querySelector('.selectLecture_edit select').value
        }).map(el => el.lectureLink)[0]

        axios.get(`/admin/deletelecture/${courseLink}/${lectureLink}`)
            .then(response => this.setState({ message: response.data }))
    },

    render() {
        let selectCourse = this.state.coursesList.map(el => <option>{el.courseName}</option>)
        let lecturesList = this.state.lecturesList.map(el => <option>{el.lectureName}</option>)
        return (
            <div className="container">
                <section id="main" className="column">
                    <div className="selectCourse_edit">
                        <p>Виберіть курс: </p>
                        <select>{selectCourse}</select>
                        <button className="btn btn-success" onClick={this.showLecturesSelect}>Підтвердити</button>
                    </div>
                    <div className="selectLecture_edit hide">
                        <p>Виберіть лекцію: </p>
                        <select>{lecturesList}</select>
                        <button className="btn btn-success" onClick={this.showEditForm}>Підтвердити</button>
                    </div>
            		<article className="module hide">
            			<header><h3>Редагувати лекцію</h3></header>
            				<div className="module_content">
                                <div className="lectureTheme">
                                    <fieldset>
                                        <label>Тема лекції</label>
                                        <input type="text" className="editLectureName" />
                                    </fieldset>
                                </div>
                			    <div className="lectureBody">
                                    <fieldset>
                                        <label>Текст</label>
                                        <textarea rows="12" className="editlectureText"></textarea>
                                    </fieldset>
                                </div>
                			</div>
                		<footer>
                			<div className="submit_link">
                                {submitMessage(this.state.message)}
                				<input type="button" className="alt_btn" value="Редагувати" onClick={this.submitEditLecture} />
                                <input type="button" className="alt_btn" value="Видалити" onClick={this.deleteLecture} />
                			</div>
                		</footer>
            		</article>
            	</section>
            </div>
        )
    }
})

export default EditLecture
