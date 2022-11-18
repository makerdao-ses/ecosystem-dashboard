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
}

const AuthContext = React.createContext<AuthContextProps>({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState('');
  const [user, setUser] = React.useState<UserDTO | undefined>(undefined);
  const router = useRouter();
  const clientRequest = new GraphQLClient(GRAPHQL_ENDPOINT);

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

  if (authToken) {
    clientRequest.setHeaders({
      authorization: `Bearer ${authToken}`,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        setCredentials,
        clearCredentials,
        clientRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
