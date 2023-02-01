/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';
import { LOCAL_STORAGE_AUTH_KEY } from './const';
import type { LoginDTO } from '../models/dto/auth.dto';

export const getAuthFromStorage = () => {
  const auth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (!auth) {
    return;
  }

  const parsedAuth = JSON.parse(auth) as LoginDTO;
  const authToken = parsedAuth?.authToken;
  if (!authToken) {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    return;
  }

  const jwtDecoded = jwt_decode(authToken);
  const { exp } = jwtDecoded as { exp: number };
  const expirationDate = new Date(exp * 1000);
  const now = new Date();
  if (!exp || expirationDate < now) {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    return;
  }

  return parsedAuth;
};
