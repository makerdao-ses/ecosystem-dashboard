import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';
import PermissionManager from '../auth/permission-manager';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { LoginDTO, UserDTO } from '../models/dto/auth.dto';
import { getAuthFromStorage } from '../utils/auth-storage';

interface AuthContextProps {
  user?: UserDTO;
  authToken?: string;
  setCredentials?: (value: LoginDTO) => void;
  clearCredentials?: () => void;
  clientRequest?: GraphQLClient;
  hasToken: boolean;
  isAuth?: boolean;
  isAdmin?: boolean;
  permissionManager: PermissionManager;
}

const AuthContext = React.createContext<AuthContextProps>({
  hasToken: false,
  isAdmin: false,
  permissionManager: new PermissionManager(),
});
const clientRequest = new GraphQLClient(GRAPHQL_ENDPOINT);
export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState<string | undefined>();
  const hasToken = authToken !== undefined;
  const isAuth = !!authToken;
  const [user, setUser] = React.useState<UserDTO | undefined>(undefined);
  const router = useRouter();
  const isAdmin = useIsAdmin(user || ({} as UserDTO));

  const permissionManager = React.useMemo(() => new PermissionManager(user, authToken), [user, authToken]);

  useLayoutEffect(() => {
    const auth = getAuthFromStorage();
    const newAuth = auth?.authToken;
    if (newAuth) {
      clientRequest.setHeaders({
        authorization: `Bearer ${newAuth}`,
      });
    }
    setAuthToken(newAuth);
    setUser(auth?.user);
  }, []);

  const setCredentials = (value: LoginDTO) => {
    setAuthToken(value.authToken || '');
    setUser(value.user);
    window.localStorage.setItem('auth', JSON.stringify(value));
  };

  const clearCredentials = async () => {
    await router.push('/login');
    setAuthToken('');
    setUser(undefined);
    window.localStorage.setItem('auth', '{}');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        setCredentials,
        clearCredentials,
        clientRequest,
        hasToken,
        isAuth,
        isAdmin,
        permissionManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
