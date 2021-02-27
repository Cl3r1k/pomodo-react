export type TUser = {
  login: string;
  id: string;
  avatarUrl?: string;
  publicRepos?: string;
};

export type TAuthState = {
  isAuthenticated: boolean;
  user: TUser | null;
};
