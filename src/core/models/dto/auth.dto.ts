export interface UserDTO {
  id: number;
  username: string;
  active: boolean;
  name: string;
  permissions: string[];
}

export interface LoginDTO {
  authToken: string;
  user: UserDTO;
}
