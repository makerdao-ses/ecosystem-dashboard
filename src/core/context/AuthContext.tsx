import React, { useLayoutEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  authToken: string;
  setIsAuthenticated: (value: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  authToken: '',
  setIsAuthenticated: () => 0,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  useLayoutEffect(() => {
    const auth = window.localStorage.getItem('auth') ?? '{}';
    setAuthenticated(JSON.parse(auth)?.authenticated ?? false);
    setUser(JSON.parse(auth)?.user ?? null);
  }, []);

  const setIsAuthenticated = (value: boolean) => {
    setAuthenticated(value);
    window.localStorage.setItem(
      'auth',
      JSON.stringify({
        authenticated: value,
        user: value ? { username: 'Wouter' } : null,
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        authToken: '',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
