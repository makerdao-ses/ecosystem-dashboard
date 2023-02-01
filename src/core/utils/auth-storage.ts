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
    // invalid stored auth data
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    return;
  }

  let jwtDecoded;
  try {
    jwtDecoded = jwt_decode(authToken);
  } catch (e) {
    // invalid jwt
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    return;
  }

  const { exp } = jwtDecoded as { exp: number };
  const expirationDate = new Date(exp * 1000);
  const now = new Date();
  if (!exp || expirationDate < now) {
    // session expired
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    return;
  }

  return parsedAuth;
};
