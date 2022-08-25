export type UserInfoType = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  enabled: boolean;
  roleName: string;
  teamId?: number;
  level?: string;
  pending: boolean;
  teamName?: string;
  avatarUrl?: string;
  jiraAccountId: string;
  worksFrom: string;
  thirdParty: boolean;
};

export type AddNewUserFormValuesType = {
  fullName: string;
  password: string;
  username: string;
  email: string;
  roleName: string;
  thirdParty: boolean;
  teamName?: string;
  teamId?: number | null;
  level?: string;
};
