import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your actual base URL

const useProfileAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrUpdateProfile = async (full_name, bio, profile_picture) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const formData = new FormData();
      formData.append("full_name", full_name);
      formData.append("bio", bio);
      formData.append("profile_picture", profile_picture);

      const response = await axios.post(`${API_BASE_URL}/profile`, formData, {
        headers,
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers,
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${API_BASE_URL}/api/user-role`, {
        headers,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    createOrUpdateProfile,
    getUserProfile,
    getUserInfo,
    loading,
    error,
  };
};

export default useProfileAPI;
