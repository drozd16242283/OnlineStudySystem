import axios from 'axios'
import queryString from './objToQuerystring'

const sendForm = (formData, url) => {
    return axios.post(url, queryString(formData))
}

export default sendForm
