import axios from 'axios';

const API_URL: string = (process.env.API_URL as string) || 'http://localhost:3000/api';

export const AxiosClientWithCookies = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

export const AxiosClientPublic = axios.create({
  baseURL: API_URL
});

export default AxiosClient;
