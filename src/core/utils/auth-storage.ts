import type { LoginDTO } from '../models/dto/auth.dto';

export const getAuthFromStorage = () => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    return JSON.parse(auth) as LoginDTO;
  }
};
