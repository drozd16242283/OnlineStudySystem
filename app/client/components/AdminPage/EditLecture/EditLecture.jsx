import React from 'react'
import axios from 'axios'
import LectureForm from 'server/helpers/forms/validateAndSend/LectureForm'
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
        document.querySelector('.select_lecture_edit').classList.remove('hide')

        let selectedCourse = this.state.coursesList.filter(el => {
            return el.courseName == document.querySelector('.select_course_edit select').value
        }).map(el => el.lectures)[0]

        this.setState({ lecturesList: selectedCourse })
    },

    showEditForm() {
        document.querySelector('.edit_lecture_module').classList.remove('hide')
    },

    submitEditLecture() {
        let editLecture = {
            courseName: document.querySelector('.select_course_edit select').value,
            lectureName: document.querySelector('.select_lecture_edit select').value,
            newLectureName: document.querySelector('.editLectureName').value,
            lectureText: document.querySelector('.editlectureText').value
        }

        let responseMessage = LectureForm(editLecture, 'edit')
        this.setState({ message: responseMessage })
    },

    deleteLecture() {
        let courseLink = this.state.coursesList.filter(el => {
            return el.courseName == document.querySelector('.select_course_edit select').value
        }).map(el => el.courseLink)[0]
        let lectureLink = this.state.lecturesList.filter(el => {
            return el.lectureName == document.querySelector('.select_lecture_edit select').value
        }).map(el => el.lectureLink)[0]

        axios.get(`/admin/deletelecture/${courseLink}/${lectureLink}`)
            .then(response => this.setState({ message: response.data }))
    },

    render() {
        let selectCourse = this.state.coursesList.map(el => <option>{el.courseName}</option>)
        let lecturesList = this.state.lecturesList.map(el => <option>{el.lectureName}</option>)
        return (
            <div className="container">
                <section id="editLecture">
                    <div className="select_edit select_course_edit">
                        <p>Виберіть курс: </p>
                        <select>{selectCourse}</select>
                        <button className="btn btn-success" onClick={this.showLecturesSelect}>Підтвердити</button>
                    </div>
                    <div className="select_edit select_lecture_edit hide">
                        <p>Виберіть лекцію: </p>
                        <select>{lecturesList}</select>
                        <button className="btn btn-success" onClick={this.showEditForm}>Підтвердити</button>
                    </div>
            		<article className="edit_lecture_module hide">
            			<header><h3>Редагувати лекцію</h3></header>
            				<div className="editLecture_module_content">
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
                			<div className="editLecture_submit_button">
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
