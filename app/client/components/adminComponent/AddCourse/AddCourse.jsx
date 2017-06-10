import React from 'react'
import axios from 'axios'

import isFormEmpty from 'server/helpers/forms/isFormEmpty'
import sendForm from 'server/helpers/forms/sendForm'
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
                let coursesCounter = 0
                if (response.data.length > 0) {
                    coursesCounter = response.data[0].courseLink
                }
                this.setState({ coursesCounter: coursesCounter })
            })
    },

    submitCourseImage() {
        let oldInput = document.querySelector('input[name="courseImage"]')
        if (oldInput != null) {
            oldInput.parentElement.removeChild(oldInput)
        }

        let inputUploader = document.createElement('input')
            inputUploader.type = 'file'
            inputUploader.name = 'courseImage'
            inputUploader.classList.add('hide')

        inputUploader.click()
        inputUploader.onchange = () => {
            let formData = new FormData()
            formData.append('courseImage', inputUploader.files[0])

            axios.post('/admin/newcourse', formData)
                .then(response => this.setState({ message: response.data }))
        }

        document.body.appendChild(inputUploader)
    },

    submitNewCourse() {
        let coursesCounter = this.state.coursesCounter
        let inputImage = document.querySelector('input[name="courseImage"]')
        let courseImageName = (inputImage != null) ? inputImage.files[0].name : false

        let courseData = {
            courseName: document.querySelector('.inputCourseName').value,
            courseImage: courseImageName,
            courseDescription: document.querySelector('.courseDescription').value,
            courseLink: ++coursesCounter
        }

        if (isFormEmpty(courseData)) {
            this.setState({ message: { error: 'Заповніть форму!' } })
        } else if (courseData.courseName.length > 30) {
            this.setState({ message: { error: 'Занадто велика назва курсу!' } })
        } else if (courseData.courseDescription.length > 175) {
            this.setState({ message: { error: 'Занадто великий опис!' } })
        } else if (inputImage == null) {
            this.setState({ message: { error: 'Виберіть зображення!' } })
        } else {
            sendForm(courseData, '/admin/newcourse')
                .then(response => this.setState({ message: response.data }))
        }
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
            				<div className="submit_link">
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
