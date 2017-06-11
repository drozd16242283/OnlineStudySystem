import React from 'react'
import axios from 'axios'
import isImage from 'server/helpers/forms/isImage'
import createFileInput from 'server/helpers/forms/createFileInput'
import CourseForm from 'server/helpers/forms/validateAndSend/CourseForm'
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

    editCourseImage() {
        let editInputUploader = createFileInput()

        editInputUploader.click()
        editInputUploader.onchange = () => {
            let formData = new FormData()
            formData.append('courseImage', editInputUploader.files[0])

            if (isImage(editInputUploader.files[0].type)) {
                axios.post('/admin/editcourse', formData)
                document.querySelector('.editCourseMessage').classList.add('show')
                this.setState({ message: { imgUploadSuccess: 'Зображення загружено' } })
            } else {
                this.setState({ message: { error: 'Виберіть зображення!' } })
            }
        }

        document.body.appendChild(editInputUploader)
    },

    submitEditCourse() {
        let inputImage = document.querySelector('input[name="courseImage"]')
        let courseImageName = (inputImage != null) ? inputImage.files[0].name : false

        let editCourse = {
            courseName: document.querySelector('.selectCourse_edit select').value,
            newCourseName: document.querySelector('.editCourseName').value,
            courseImage: courseImageName,
            courseDescription: document.querySelector('.editCourseDesc').value
        }

        let responseMessage = CourseForm(editCourse, inputImage, false)
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
                                <fieldset className="editCourseImage">
                                    <label>Зображення</label>
                                    <button className="btn btn-primary" onClick={this.editCourseImage}>Виберіть зображення</button>
                                    <div className="editCourseMessage">{submitMessage(this.state.message)}</div>
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
            				<div className="edit_submit_link">
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
