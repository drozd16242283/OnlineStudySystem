import React from 'react'
import axios from 'axios'
import CommentForm from 'server/helpers/forms/validateAndSend/CommentForm'
import submitMessage from 'server/helpers/forms/submitMessage'

import './Comments.css'

const Comments = React.createClass({
    getInitialState() {
        return {
            message: {},
            commentsList: [],
            test: []
        }
    },

    componentDidMount() {
        let url = `/courses/getlectures/${this.props.courseLink}/${this.props.lectureLink}`
        axios.get(url).then(response => this.setState({ commentsList: response.data.comments }))
    },

    submitComment() {
        let commentData = {
            userName: localStorage.getItem('username'),
            commentText: document.querySelector('.commentText').value,
            courseLink: this.props.courseLink,
            lectureLink: this.props.lectureLink
        }

        let responseMessage = CommentForm(commentData)
        this.setState({ message: responseMessage })
    },

    getCommentsList() {
        let commentsList = this.state.commentsList.map(el => {
            if (el.lectureLink == this.props.lectureLink) {
                return (
                    <div className="commentList">
                        <img src="../../images/man.png" />
                        <h5>{el.author}</h5>
                        <div><p>{el.commentText}</p></div>
                    </div>
                )
            } else {
                return false
            }
        })

        return commentsList
    },

    render() {
        return (
            <div className="container commentBlock">
                <h4>Коментарі</h4>
                <hr />
                <textarea rows="4" className="commentText"></textarea>
                <div className="pull-right submitBlock">
                    {submitMessage(this.state.message)}
                    <button type="button" className="btn btn-success" onClick={this.submitComment}>Додати коментар</button>
                </div>
                {this.getCommentsList()}
            </div>
        )
    }
})


export default Comments
