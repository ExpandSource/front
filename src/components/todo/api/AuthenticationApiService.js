import { apiClient } from './ApiClient';

//
export const executeBasicAutheticationService = (token) =>
  apiClient.get(`/basicauth`, { headers: { Authorization: token } });

export const executeJwtAutheticationService = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });
