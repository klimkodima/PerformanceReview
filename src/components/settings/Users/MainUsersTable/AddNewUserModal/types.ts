import { TeamsDataResponseType } from '../../../../../store/Filter/types';

export type AddNewUserValidationType = {
  email: string | null;
  password: string | null;
  roleName: string | null;
  username: string | null;
  level: string | null;
  teamName: string | null;
};

export type TeamsDataType = TeamsDataResponseType & {
  teamId: number;
};
