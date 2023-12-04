import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/users`;

// const apiClient = axios.create({
//   baseURL: "http://localhost:5000/api",   check my discord clone
//   timeout: 2000,
// });

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// logout user

const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`);

    return response.data.message;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// get loggin status

const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/getLoginStatus`);

    return response.data.message;
  } catch (error) {
    console.error("Get login status error:", error);
    throw error;
  }
};
//  get user

const getuser = async () => {
  try {
    const response = await axios.get(`${API_URL}/getuser`);
    return response.data.user;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

// update user
const updateUser = async (userData) => {
  try {
    const response = await axios.patch(`${API_URL}/updateuser`, userData);
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

// update the user photo

const updatePhoto = async (userData) => {
  try {
    const response = await axios.patch(`${API_URL}/updatePhoto`, userData);
    return response.data;
  } catch (error) {
    console.error("Update user photo error:", error);
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getuser,
  updateUser,
  updatePhoto,
};

export default authService;
