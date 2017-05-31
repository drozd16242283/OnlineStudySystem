import React from 'react'

import isFormEmpty from 'server/helpers/forms/isFormEmpty'
import sendForm from 'server/helpers/forms/sendForm'

import './AddCourse.css'

const AddCourse = React.createClass({
    getInitialState() {
        return {
            message: {}
        }
    },

    submitNewCourse() {
        let courseData = {
            courseName: document.querySelector('.inputCourseName').value,
            courseImage: document.querySelector('.inputImageName').value,
            courseDescription: document.querySelector('.courseDescription').value
        }

        if (isFormEmpty(courseData)) {
            this.setState({ message: { error: 'Заповніть форму!' } })
        } else if (courseData.courseDescription.length > 175) {
            this.setState({ message: { error: 'Занадто великий опис!' } })
        } else {
            sendForm(courseData, '/admin/newcourse')
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
        return (
            <section id="main" className="column">
        		<article className="module width_full">
        			<header><h3>Додати новий курс</h3></header>
        				<div className="module_content">
        					<fieldset>
        						<label>Назва курсу</label>
        						<input type="text" className="inputCourseName" />
        					</fieldset>
                            <fieldset>
                                <label>Зображення</label>
                                <input type="text" className="inputImageName" />
                            </fieldset>
        					<fieldset>
        						<label>Опис</label>
        						<textarea rows="6" className="courseDescription"></textarea>
        					</fieldset>
        				</div>
        			<footer>
        				<div className="submit_link">
                            {this.submitMessage()}
        					<input type="button" className="alt_btn" value="Опублікувати" onClick={this.submitNewCourse} />
        				</div>
        			</footer>
        		</article>
        	</section>
        )
    }
})

export default AddCourse
