import React from 'react'
import axios from 'axios'

import './Marks.css'

const Marks = React.createClass({
    getInitialState() {
        return {
            practicalsList: []
        }
    },

    componentDidMount() {
        axios.get('/courses/getpracticals')
            .then(response => this.setState({ practicalsList: response.data }))
    },

    getMarksList() {
        let marksList = this.state.practicalsList.map(practical => {
            let mark = (practical.mark === 0)
                ? <p className="not_review">Не перевірено</p>
                : practical.mark
            return (
                <tr>
                    <td>{practical.userName}</td>
                    <td>{practical.practicalName}</td>
                    <td>{mark}</td>
                </tr>
            )
        })

        return marksList
    },

    render() {
        return (
            <div>
                <table className="marksTable">
                    <tr>
                        <th>Ім'я учня</th>
                        <th>Назва практичної</th>
                        <th>Оцінка</th>
                    </tr>
                    {this.getMarksList()}
                </table>
            </div>
        )
    }
})

export default Marks
