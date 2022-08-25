export type LoginDataType = {
  username: string;
  password: string;
};

export type LoginResponseType = {
  type: string;
  accessToken: string;
};

export type CurrentUserType = {
  id: number;
  fullName: string;
  username?: string;
  enabled?: boolean;
  roleName: string;
  teamId?: number;
  level?: string;
  teamName?: string;
};
