import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-151e6.firebaseio.com'
});

export default instance;