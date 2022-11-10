import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import { LoginDTO, UserDTO } from '../models/dto/auth.dto';

interface AuthContextProps {
  user?: UserDTO;
  authToken: string;
  setCredentials?: (value: LoginDTO) => void;
  clearCredentials?: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  user: undefined,
  authToken: '',
  setCredentials: undefined,
  clearCredentials: undefined,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState('');
  const [user, setUser] = React.useState<UserDTO | undefined>(undefined);
  const router = useRouter();

  useLayoutEffect(() => {
    const auth = window.localStorage.getItem('auth') ?? '{}';
    setAuthToken(JSON.parse(auth)?.authToken ?? false);
    setUser(JSON.parse(auth)?.user ?? null);
  }, []);

  const setCredentials = (value: LoginDTO) => {
    setAuthToken(value.authToken);
    setUser(value.user);
    window.localStorage.setItem('auth', JSON.stringify(value));
  };

  const clearCredentials = () => {
    setAuthToken('');
    setUser(undefined);
    window.localStorage.setItem('auth', '{}');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        setCredentials,
        clearCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
