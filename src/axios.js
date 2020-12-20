import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        Authorization: token !== null ? 'Bearer ' + token : ''
    }
})

export default instance;