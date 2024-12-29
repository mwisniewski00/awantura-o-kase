import { AxiosClientPublic, AxiosClientWithCookies } from './AxiosClient';

export interface CreateAccountRequest {
  userName: string;
  email: string;
  password: string;
}

export async function createAccount(body: CreateAccountRequest) {
  await AxiosClientPublic.post('/Auth/Register', body);
}

export interface LogInRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  jwtToken: string;
  userName: string;
  email: string;
  id: string;
}

export function logIn(body: LogInRequest) {
  return AxiosClientPublic.post<LoginResponse>(`/Auth/Login`, body);
}

export function refreshToken() {
  return AxiosClientWithCookies.get<LoginResponse>('/Auth/RefreshToken');
}

export function logout() {
  return AxiosClientWithCookies.delete('/Auth/Logout');
}
