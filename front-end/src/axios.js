import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5000/api'
    baseURL: 'https://synonymy-app.herokuapp.com/api'
});

export default instance;