import React from 'react'
import axios from 'axios'

import isFormEmpty from 'server/helpers/forms/isFormEmpty'
import sendForm from 'server/helpers/forms/sendForm'
import submitMessage from 'server/helpers/forms/submitMessage'

import './EditCourse.css'

const EditCourse = React.createClass({
    getInitialState() {
        return {
            coursesList: [],
            selectedCourse: [],
            message: {}
        }
    },

    componentDidMount() {
        axios.get('/courses/getcourses')
            .then(response => this.setState({ coursesList: response.data }))
    },

    showEditForm() {
        document.querySelector('.module').classList.remove('hide')

        let selectedCourse = this.state.coursesList.filter(el => {
            return el.courseName == document.querySelector('.selectCourse_edit select').value
        })
        this.setState({ selectedCourse: selectedCourse })
    },

    submitEditCourse() {
        let editCourse = {
            courseName: document.querySelector('.selectCourse_edit select').value,
            newCourseName: document.querySelector('.editCourseName').value,
            courseDescription: document.querySelector('.editCourseDesc').value
        }

        if (isFormEmpty(editCourse)) {
            this.setState({ message: { error: 'Заповніть форму!' } })
        } else if (editCourse.courseDescription.length > 175) {
            this.setState({ message: { error: 'Занадто великий опис!' } })
        } else if (editCourse.courseName.length > 30) {
            this.setState({ message: { error: 'Занадто велика назва курсу!' } })
        } else {
            sendForm(editCourse, '/admin/editcourse')
                .then(response => this.setState({ message: response.data }))
        }

    },

    getSelectedCourseInfo() {
        return this.state.selectedCourse.map(el => {
            return (
                <div className="courseInfo">
                    <p>Назва курсу: {el.courseName}</p>
                    <p>Опис курсу: {el.courseDescription}</p>
                </div>
            )
        })
    },

    deleteCourse() {
        let courseLink = this.state.selectedCourse[0].courseLink
        axios.get(`/admin/deletecourse/${courseLink}`)
            .then(response => this.setState({ message: response.data }))
    },

    render() {
        let selectCourse = this.state.coursesList.map(el => <option>{el.courseName}</option>)
        return (
            <div className="container">
                <section id="main" className="column">
                    <div className="selectCourse_edit">
                        <p>Виберіть курс: </p>
                        <select>{selectCourse}</select>
                        <button className="btn btn-success" onClick={this.showEditForm}>Підтвердити</button>
                    </div>
                    {this.getSelectedCourseInfo()}
            		<article className="module width_full hide">
            			<header><h3>Редагувати курс</h3></header>
            				<div className="module_content">
            					<fieldset>
            						<label>Назва курсу</label>
            						<input type="text" className="editCourseName" />
            					</fieldset>
            					<fieldset>
            						<label>Опис</label>
            						<textarea rows="6" className="editCourseDesc" ></textarea>
            					</fieldset>
            				</div>
            			<footer>
            				<div className="submit_link">
                                {submitMessage(this.state.message)}
            					<input type="button" className="alt_btn" value="Редагувати" onClick={this.submitEditCourse} />
                                <input type="button" className="alt_btn" value="Видалити" onClick={this.deleteCourse} />
            				</div>
            			</footer>
            		</article>
            	</section>
            </div>
        )
    }
})

export default EditCourse
