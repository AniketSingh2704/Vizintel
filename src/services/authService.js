// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (data) => {
  return axios.post(`${API_URL}/auth/signup`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const loginAdmin = async (data) => {
  return axios.post(`${API_URL}/auth/login`, data, { headers: { "role": "admin" } });
};
