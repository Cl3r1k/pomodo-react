export type TAuthState = {
  isAuthenticated: boolean;
  user: {
    login: string;
    id: string;
    avatarUrl?: string;
    publicRepos?: string;
  };
};
