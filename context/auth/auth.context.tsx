/* eslint-disable no-shadow */
import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { AuthContextType } from './auth.type';
import { Token } from './utils/storage';
import { decodeJWT } from './utils/decodeJWT';
import { RouteEnum } from '@/shared/enums';

const Context = React.createContext({} as AuthContextType);

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    // @ts-ignore
    return this.props.children; 
  }
}

export function AuthContext({ children }: { children: ReactElement | ReactElement[] | ReactNode }) {
  const router = useRouter();
  const { save, get, remove } = Token();

  const [auth, setAuth] = useState<AuthContextType>({
    logged: false,
    loading: true,
    user: {},
    token: '',
    logout: () => {},
    login: () => {},
  });

  const setToken = (token: string) => {
    save(token);
    setAuth({ ...auth, token });
  }

  const signOut = () => {
    remove();
    setAuth({ ...auth, logged: false, loading: false, user: {}, token: '' });
  };

  const signIn = (token: string) => {
    if (token === auth.token) return;
    const decoded = decodeJWT(token);
    if (!decoded) return signOut();
    const { user } = decoded;
    setToken(token);
    setAuth({ ...auth, logged: true, loading: false, user, token });
  };

  const verifyLocalToken = () => {
    const saved_token = get();
    if (!saved_token) return signOut();
    return signIn(saved_token);
  };

  useEffect(() => {
    verifyLocalToken();
  }, []);

  useEffect(() => {
    if (!auth.loading && auth.logged && router.pathname === RouteEnum.SIGN_IN) router.replace(RouteEnum.DASHBOARD);
  }, [auth.loading, auth.logged, auth.user]);
  
  const memoized_context = useMemo(() => ({
    ...auth,
    logout: signOut,
    login: signIn
  }), [auth]);
  return (
    <ErrorBoundary>
      <Context.Provider value={memoized_context}>
        {children}
      </Context.Provider>
    </ErrorBoundary>
  );
}

export function useAuth() {
  return useContext(Context);
}
