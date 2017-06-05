import React from 'react'
import axios from 'axios'

import './Lecture.css'

const Lecture = React.createClass({
    getInitialState() {
        return {
            lecture: {},
            comments: {}
        }
    },

    componentDidMount() {
        let url = `/courses/${this.props.params.lectureLink}`
        axios.get(url)
            .then(response => this.setState({ lecture: response.data.lecture, comments: response.data.comments  }))
    },

    render() {
        let lecture = this.state.lecture
        return (
            <div className="container lectureBlock">
                <p>Lecture</p>
                <p>{this.props.params.lectureLink}</p>
                
            </div>
        )
    }
})

export default Lecture
