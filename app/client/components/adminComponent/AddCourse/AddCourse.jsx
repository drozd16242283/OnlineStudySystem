import React from 'react'
import axios from 'axios'
import isImage from 'server/helpers/forms/isImage'
import createFileInput from 'server/helpers/forms/createFileInput'
import CourseForm from 'server/helpers/forms/validateAndSend/CourseForm'
import submitMessage from 'server/helpers/forms/submitMessage'

import './AddCourse.css'

const AddCourse = React.createClass({
    getInitialState() {
        return {
            message: {},
            coursesCounter: 0
        }
    },

    componentDidMount() {
        axios.get('/courses/coursescounter')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({ coursesCounter: response.data[0].courseLink })
                }
            })
    },

    submitCourseImage() {
        let inputUploader = createFileInput()

        inputUploader.click()
        inputUploader.onchange = () => {
            let formData = new FormData()
            formData.append('courseImage', inputUploader.files[0])

            if (isImage(inputUploader.files[0].type)) {
                axios.post('/admin/newcourse', formData)
                document.querySelector('.submitCourseMessage').classList.add('show')
                this.setState({ message: { imgUploadSuccess: 'Зображення загружено' } })
            } else {
                this.setState({ message: { error: 'Виберіть зображення!' } })
            }
        }

        document.body.appendChild(inputUploader)
    },

    submitNewCourse() {
        document.querySelector('.course_submit_link img').classList.add('show')
        let inputImage = document.querySelector('input[name="courseImage"]')
        let courseImageName = (inputImage != null) ? inputImage.files[0].name : false
        let coursesCounter = this.state.coursesCounter

        let courseData = {
            courseName: document.querySelector('.inputCourseName').value,
            courseImage: courseImageName,
            courseDescription: document.querySelector('.courseDescription').value,
            courseLink: ++coursesCounter
        }

        let responseMessage = CourseForm(courseData, inputImage, true)
        this.setState({ message: responseMessage })
    },

    render() {
        return (
            <div className="container">
                <section id="main" className="column">
            		<article className="module width_full">
            			<header><h3>Додати новий курс</h3></header>
            				<div className="module_content">
                                <fieldset className="inputCourseImage">
                                    <label>Зображення</label>
                                    <button className="btn btn-primary" onClick={this.submitCourseImage}>Виберіть зображення</button>
                                    <div className="submitCourseMessage">{submitMessage(this.state.message)}</div>
                                </fieldset>
            					<fieldset>
            						<label>Назва курсу</label>
            						<input type="text" className="inputCourseName" />
            					</fieldset>
            					<fieldset>
            						<label>Опис</label>
            						<textarea rows="6" className="courseDescription"></textarea>
            					</fieldset>
            				</div>
            			<footer>
            				<div className="course_submit_link">
                                {submitMessage(this.state.message)}
            					<input type="button" className="alt_btn" value="Опублікувати" onClick={this.submitNewCourse} />
            				</div>
            			</footer>
            		</article>
            	</section>
            </div>
        )
    }
})

export default AddCourse
