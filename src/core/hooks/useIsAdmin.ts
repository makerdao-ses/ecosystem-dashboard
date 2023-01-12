import { getCorrectRoleApi } from '../utils/string.utils';
import type { UserDTO } from '../models/dto/auth.dto';

export const useIsAdmin = (user: UserDTO) => {
  const isAdmin = false;
  const role = getCorrectRoleApi(user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (role.mainRole === 'Site Admin') return true;
  return isAdmin;
};
