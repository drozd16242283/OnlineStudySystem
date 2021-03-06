import React from 'react'
import axios from 'axios'
import isArchive from 'server/helpers/forms/isArchive'
import submitMessage from 'server/helpers/forms/submitMessage'

import './Lecture.css'

const Lecture = React.createClass({
    getInitialState() {
        return {
            currentLecture: [],
            message: {}
        }
    },

    componentDidMount() {
        this.getLecturesList(this.props.params.lectureLink)
            .then(response => this.setState({ currentLecture: response.data.lectures[0] }))

    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.lectureLink !== this.props.params.lectureLink) {
            this.getLecturesList(nextProps.params.lectureLink)
                .then(response => this.setState({ currentLecture: response.data.lectures[0] }))
        }
    },

    getLecturesList(link) {
        let url = `/courses/getlectures/${this.props.params.courseLink}/${link}`
        return axios.get(url)
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
                formData.append('practicalName', this.state.currentLecture.lectureName)
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

        let lecture = this.state.currentLecture
        let isPractical = !lecture.isLecture
            ? <div className="practicalFileInput">
                  <h5>Виберіть архів з виконаною практичною: </h5>
                  <button className="btn btn-primary" onClick={this.submitPractical}>Вибрати</button>
                  {submitMessage(this.state.message)}
              </div>
            : false

        return (
            <div className="lectureBlock">
                <h1>{lecture.lectureName}</h1>
                <p>{lecture.lectureText}</p>
                {isPractical}

            </div>
        )
    }
})

export default Lecture
