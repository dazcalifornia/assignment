import axios from "axios";

const serverUrl = "http://localhost:3000"; // Replace with your server URL

const usePostsAPI = () => {
  const getPosts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/posts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createPost = async (postData) => {
    console.log(postData);
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.post(`${serverUrl}/post`, postData, {
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { getPosts, createPost };
};

export default usePostsAPI;
