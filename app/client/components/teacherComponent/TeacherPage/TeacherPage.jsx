import React from 'react'
import axios from 'axios'
import sendForm from 'server/helpers/forms/validateAndSend/sendForm'
import submitMessage from 'server/helpers/forms/submitMessage'

import './TeacherPage.css'

const TeacherPage = React.createClass({
    getInitialState() {
        return {
            practicalList: [],
            message: ''
        }
    },

    componentDidMount() {
        axios.get('/courses/getpracticals')
            .then(response => this.setState({ practicalList: response.data }))
    },

    getPracticalsList() {
        let practicalsList = this.state.practicalList.map((el, i) => {
            let marks = []
            for (let i = 1; i <= 5; i++) {
                marks.push(<option>{i}</option>)
            }

            if (el.mark > 0) {
                delete marks[el.mark - 1]
                marks[el.mark - 1] = <option selected>{el.mark}</option>
            }

            return (
                <tr className="practical">
                    <td className="practical_filename"><a href={`/teacher/download/${el.fileName}`}>{el.fileName}</a></td>
                    <td>{el.practicalName}</td>
                    <td className="practical_username">{el.userName}</td>
                    <td><select>{marks}</select></td>
                    <td><button className="btn btn-success" onClick={() => this.submitMark(i)}>Прийняти</button></td>
                </tr>
            )
        })

        return practicalsList
    },

    submitMark(i) {
        let marksData = {
            userName: document.querySelectorAll('.practical_username')[i].innerText,
            fileName: document.querySelectorAll('.practical_filename')[i].innerText,
            mark: document.querySelectorAll('.table select')[i].value
        }

        sendForm(marksData, '/teacher/submitmarks')
            .then(response => this.setState({ message: response.data }))
    },

    render() {
        return (
            <div className="container teacherPage">
                <table className="table">
                    <tr>
                        <th>Назва файлу</th>
                        <th>Практична</th>
                        <th>Ім'я учня</th>
                        <th>Оцінка</th>
                        <th className="marksMessage">{submitMessage(this.state.message)}</th>
                    </tr>
                    {this.getPracticalsList()}
                </table>
            </div>
        )
    }
})

export default TeacherPage
