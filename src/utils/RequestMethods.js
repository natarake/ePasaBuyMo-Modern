import axios from 'axios';

const BASE_URL = 'https://e-pasa-buy-mo-backend.vercel.app/api';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const getToken = () => {
  try {
    const persistedRoot = JSON.parse(localStorage.getItem('persist:root'));
    if (!persistedRoot?.user) return null;
    const userState = JSON.parse(persistedRoot.user);
    return userState?.currentUser?.accessToken || null;
  } catch {
    return null;
  }
};

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.token = `Bearer ${token}`;
  }
  return config;
});
