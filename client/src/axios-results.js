import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wine-2da6c.firebaseio.com/'
});

export default instance;