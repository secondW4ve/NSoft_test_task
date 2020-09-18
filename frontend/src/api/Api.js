import axios from 'axios';

export default axios.create({
  baseURL: '/api/1.0/',
  responseType: "json"
});

