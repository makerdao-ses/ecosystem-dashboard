import { UserDTO } from '../models/dto/auth.dto';

export const useIsAdmin = (user: UserDTO) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAdmin = (user as any)?.roles[0].name === 'SuperAdmin';
  return isAdmin;
};
