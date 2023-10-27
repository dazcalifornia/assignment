import axios from "axios";

const serverUrl = "http://localhost:3000"; // Replace with your server URL

const useAuth = () => {
  const register = async (userData) => {
    try {
      const response = await axios.post(`${serverUrl}/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(`${serverUrl}/login`, userData);
      //store token in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expiresAt", response.data.expirationTime);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${serverUrl}/logout`, null, {
        headers,
      });
      //remove token from local localStorage
      localStorage.removeItem("token");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { register, login, logout };
};

export default useAuth;
