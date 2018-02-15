import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-2b645.firebaseio.com/'
});

export default instance;