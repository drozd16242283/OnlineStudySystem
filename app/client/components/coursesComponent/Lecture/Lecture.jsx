import React from 'react'
import axios from 'axios'

import Comments from '../Comments'
import isArchive from 'server/helpers/forms/isArchive'
import submitMessage from 'server/helpers/forms/submitMessage'

import './Lecture.css'

const Lecture = React.createClass({
    getInitialState() {
        return {
            lecture: {},
            comments: {},
            message: {}
        }
    },

    componentDidMount() {
        let url = `/courses/getlectures/${this.props.params.courseLink}/${this.props.params.lectureLink}`
        axios.get(url)
            .then(response => this.setState(
                { lecture: response.data.lectures[0], comments: response.data.comments[0] }
            ))
    },

    submitPractical() {
        let oldInput = document.querySelector('input[name="inputPractical"]')
        if (oldInput != null) {
            oldInput.parentElement.removeChild(oldInput)
        }

        let practicalUploader = document.createElement('input')
            practicalUploader.type = 'file'
            practicalUploader.name = 'inputPractical'
            practicalUploader.classList.add('hide')

        practicalUploader.click()
        practicalUploader.onchange = () => {
            let formData = new FormData()
                formData.append('inputPractical', practicalUploader.files[0])
                formData.append('practicalName', this.state.lecture.lectureName)
                formData.append('userName', localStorage.getItem('username'))

            if (isArchive(practicalUploader.files[0].type)) {
                if (practicalUploader.files[0].size < 50000000) {
                    axios.post('/courses/uploadpractical', formData)
                    this.setState({ message: { practicalUploadSuccess: 'Практичну завантажено.' } })
                } else {
                    this.setState({ message: { error: 'Файл занадто великий!' } })
                }
            } else {
                this.setState({ message: { error: 'Виберіть архів!' } })
            }
        }

        document.body.appendChild(practicalUploader)
    },

    render() {
        let lecture = this.state.lecture
        let isPractical = !lecture.isLecture
            ? <div className="practicalFileInput">
                  <h5>Виберіть архів з виконаною практичною: </h5>
                  <button className="btn btn-primary" onClick={this.submitPractical}>Вибрати</button>
                  {submitMessage(this.state.message)}
              </div>
            : false

        return (
            <div className="container lectureBlock">
                <h1>{lecture.lectureName}</h1>
                <p>{lecture.lectureText}</p>
                {isPractical}
                <Comments comments={this.state.comments} />
            </div>
        )
    }
})

export default Lecture
