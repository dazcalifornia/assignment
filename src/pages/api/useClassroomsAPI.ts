import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Replace with your actual base URL

const useClassroomAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createClassroom = async (name) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/classrooms`, { name });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const joinClassroom = async (inviteCode) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/classrooms/join`,
        {
          inviteCode,
        },
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getJoinedClassrooms = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${API_BASE_URL}/classrooms`, {
        headers,
      });
      setLoading(false);
      return response.data.joinedClass; // Assuming the response structure matches your API
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getClassroomDetails = async (classroomId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${API_BASE_URL}/classrooms/${classroomId}`,
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createClassroomFeed = async (classroomId, name) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${API_BASE_URL}/classroom/${classroomId}/feeds`,
        { name },
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getClassroomFeeds = async (classroomId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${API_BASE_URL}/classrooms/${classroomId}/feeds`,
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getClassroomFeedPosts = async (classroomId, feedId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${API_BASE_URL}/classrooms/${classroomId}/feeds/${feedId}/posts`,
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createClassroomPost = async (classroomId, feedId, content) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${API_BASE_URL}/classrooms/${classroomId}/feeds/${feedId}/posts`,
        { content },
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createAssignment = async (classroomId, data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${API_BASE_URL}/classrooms/${classroomId}/assignments`,
        data,
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getAssignments = async (classroomId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${API_BASE_URL}/classrooms/${classroomId}/assignments`,
        { headers }
      );
      setLoading(false);
      return response.data.assignments;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const submitAssignment = async (classroomId, assignmentId, file) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const formData = new FormData();
      formData.append("assignmentFile", file);

      const response = await axios.post(
        `${API_BASE_URL}/classrooms/${classroomId}/assignments/${assignmentId}/submit`,
        formData,
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const scoreAssignment = async (
    classroomId,
    assignmentId,
    submissionId,
    data
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        `${API_BASE_URL}/classrooms/${classroomId}/assignments/${assignmentId}/score`,
        { submissionId, ...data },
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getAssignmentScoresAndFeedback = async (classroomId, assignmentId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `${API_BASE_URL}/classrooms/${classroomId}/assignments/${assignmentId}`,
        { headers }
      );
      setLoading(false);
      return response.data.scoresAndFeedback;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const reportPlagiarism = async (classroomId, assignmentId, data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        `${API_BASE_URL}/classrooms/${classroomId}/assignments/${assignmentId}/report-plagiarism`,
        data,
        { headers }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    getClassroomFeedPosts,
    createClassroom,
    joinClassroom,
    getJoinedClassrooms,
    getClassroomDetails,
    createClassroomFeed,
    getClassroomFeeds,
    createClassroomPost,
    createAssignment,
    getAssignments,
    submitAssignment,
    scoreAssignment,
    getAssignmentScoresAndFeedback,
    reportPlagiarism,
    loading,
    error,
  };
};

export default useClassroomAPI;
