import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';
import { LoginDTO, UserDTO } from '../models/dto/auth.dto';

interface AuthContextProps {
  user?: UserDTO;
  authToken?: string;
  setCredentials?: (value: LoginDTO) => void;
  clearCredentials?: () => void;
  clientRequest?: GraphQLClient;
  isAlreadyToken: boolean;
  isAuth?: boolean;
}

const AuthContext = React.createContext<AuthContextProps>({ isAlreadyToken: false });
const clientRequest = new GraphQLClient(GRAPHQL_ENDPOINT);
export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState<string | undefined>();
  const isAlreadyToken = authToken !== undefined;
  const isAuth = !!authToken;
  console.log({ authToken });

  const [user, setUser] = React.useState<UserDTO | undefined>(undefined);
  const router = useRouter();

  useLayoutEffect(() => {
    const auth = window.localStorage.getItem('auth') ?? '{}';
    const newAuth = JSON.parse(auth)?.authToken ?? false;
    if (newAuth) {
      clientRequest.setHeaders({
        authorization: `Bearer ${newAuth}`,
      });
    }
    setAuthToken(newAuth);
    setUser(JSON.parse(auth)?.user ?? null);
  }, []);

  const setCredentials = (value: LoginDTO) => {
    setAuthToken(value.authToken || '');
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
        clientRequest,
        isAlreadyToken,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
