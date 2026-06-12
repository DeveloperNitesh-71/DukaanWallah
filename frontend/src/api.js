import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Allow sending cookies to the server
});

// Interceptor removed since we now use secure HTTP-Only cookies
// Cookies are automatically handled by the browser

export default API;
