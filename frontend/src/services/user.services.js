import { axiosInstance } from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.data || error || { message: 'An unknown error occurred' };
  }
};

const register = async (name, email, password, role) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name,
      email,
      password,
      role,
    });

    return response.data;
  } catch (error) {
    throw error.data || error || { message: 'An unknown error occurred' };
  }
};

const getProfile = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE);

    return response.data;
  } catch (error) {
    throw error.data || error || { message: 'An unknown error occurred' };
  }
};

const userService = {
  login,
  register,
  getProfile,
};

export default userService;
