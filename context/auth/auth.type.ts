export type AuthContextType = {
  logged: boolean | undefined,
  loading: boolean,
  user: any,
  token: string;
  logout: Function;
  login: (token: string) => void;
};
