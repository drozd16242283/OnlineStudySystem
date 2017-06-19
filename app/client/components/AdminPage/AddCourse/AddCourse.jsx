import React from 'react'
import axios from 'axios'
import createFileInput from 'server/helpers/forms/createFileInput'
import sendCourseForm from 'server/helpers/forms/validateAndSend/CourseForm'
import sendCourseImage from 'server/helpers/forms/validateAndSend/CourseImage'
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
        let inputImageUploader = createFileInput()

        inputImageUploader.click()
        inputImageUploader.onchange = () => {
            let responseMessage = sendCourseImage(inputImageUploader.files[0], 'add')
            this.setState({ message: responseMessage })
        }

        document.body.appendChild(inputImageUploader)
    },

    submitNewCourse() {
        document.querySelector('.submitCourseImgMessage').classList.remove('show')

        let coursesCounter = this.state.coursesCounter
        let courseImage = document.querySelector('input[name="courseImage"]')
        let courseImageName = (courseImage != null && courseImage.files.length > 0)
            ? courseImage.files[0].name
            : false

        let newCourseData = {
            courseName: document.querySelector('.inputCourseName').value,
            courseImage: courseImageName,
            courseDescription: document.querySelector('.courseDescription').value,
            courseLink: ++coursesCounter
        }

        let responseMessage = sendCourseForm(newCourseData, courseImage, 'add')
        this.setState({ message: responseMessage })
    },

    render() {
        return (
            <div className="container">
                <section id="addCourse">
            		<article className="addCourse_module">
            			<header><h3>Додати новий курс</h3></header>
            				<div className="addCourse_module_content">
                                <fieldset className="inputCourseImage">
                                    <label>Зображення</label>
                                    <button className="btn btn-primary" onClick={this.submitCourseImage}>Виберіть зображення</button>
                                    <div className="submitCourseImgMessage">{submitMessage(this.state.message)}</div>
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
            				<div className="addCourse_submit_button">
                                {submitMessage(this.state.message)}
            					<input type="button" value="Опублікувати" onClick={this.submitNewCourse} />
            				</div>
            			</footer>
            		</article>
            	</section>
            </div>
        )
    }
})

export default AddCourse
