import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // Update with your backend URL

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    console.log(response.data);
    const token = response.data.token;

    localStorage.setItem('token', token);

    return response.data;
  },

  signup: async (username, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  },
};

export default authService;
