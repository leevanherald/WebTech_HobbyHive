import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:3005', // your user_server port
  withCredentials: true,
});

export default userApi;
