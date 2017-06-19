import React from 'react'
import axios from 'axios'
import createFileInput from 'server/helpers/forms/createFileInput'
import sendCourseForm from 'server/helpers/forms/validateAndSend/CourseForm'
import sendCourseImage from 'server/helpers/forms/validateAndSend/CourseImage'
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
        document.querySelector('.editCourse_module').classList.remove('hide')

        let selectedCourse = this.state.coursesList.filter(el => {
            return el.courseName == document.querySelector('.selectCourse_edit select').value
        })
        this.setState({ selectedCourse: selectedCourse })
    },

    editCourseImage() {
        let editInputUploader = createFileInput()

        editInputUploader.click()
        editInputUploader.onchange = () => {
            let responseMessage = sendCourseImage(editInputUploader.files[0], 'edit')
            this.setState({ message: responseMessage })
        }

        document.body.appendChild(editInputUploader)
    },

    submitEditCourse() {
        document.querySelector('.submitCourseImgMessage').classList.remove('show')

        let courseImage = document.querySelector('input[name="courseImage"]')
        let courseImageName = (courseImage != null && courseImage.files.length > 0)
            ? courseImage.files[0].name
            : false

        let editCourse = {
            courseName: document.querySelector('.selectCourse_edit select').value,
            newCourseName: document.querySelector('.editCourseName').value,
            courseImage: courseImageName,
            courseDescription: document.querySelector('.editCourseDesc').value
        }

        let responseMessage = sendCourseForm(editCourse, courseImage, 'edit')
        this.setState({ message: responseMessage })
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
                <section id="editCourse">
                    <div className="selectCourse_edit">
                        <p>Виберіть курс: </p>
                        <select>{selectCourse}</select>
                        <button className="btn btn-success" onClick={this.showEditForm}>Підтвердити</button>
                    </div>
                    {this.getSelectedCourseInfo()}
            		<article className="editCourse_module hide">
            			<header><h3>Редагувати курс</h3></header>
            				<div className="editCourse_module_content">
                                <fieldset className="editCourseImage">
                                    <label>Зображення</label>
                                    <button className="btn btn-primary" onClick={this.editCourseImage}>Виберіть зображення</button>
                                    <div className="submitCourseImgMessage">{submitMessage(this.state.message)}</div>
                                </fieldset>
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
            				<div className="edit_submit_button">
                                {submitMessage(this.state.message)}
            					<input type="button" value="Редагувати" onClick={this.submitEditCourse} />
                                <input type="button" value="Видалити" onClick={this.deleteCourse} />
            				</div>
            			</footer>
            		</article>
            	</section>
            </div>
        )
    }
})

export default EditCourse
