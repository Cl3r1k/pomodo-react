export type TGithubResponse = {
  login: string;
  id: string;
  avatar_url: string;
  public_repos: string;
};

export const isTGithubResponseGuard = (
  obj: unknown
): obj is TGithubResponse => {
  return (
    'login' in (obj as TGithubResponse) &&
    'id' in (obj as TGithubResponse) &&
    'avatar_url' in (obj as TGithubResponse) &&
    'public_repos' in (obj as TGithubResponse)
  );
};
