export type FilterState = {
  data: AuditorType[];
  teams: TeamsDataResponseType[];
  filteredTeams: FilterDataType;
  filteredLevels: FilterDataType;
  filteredAuditors: FilterDataType;
  checkedTeams: FilterDataType;
  checkedLevels: FilterDataType;
  checkedAuditors: FilterDataType;
  searchedAuditors: FilterDataType;
  isDisabledReset: boolean;
  checkedAuditorsData: CheckedAuditorsDataType;
  isShowFilter: boolean;
};

export type AuditorType = {
  id: number;
  name: string;
  roleName: string;
  teamId: number;
  team: string;
  level: string;
  teamLeaderName: string;
};

export type FilterAction = {
  payload: string;
};

export type FilterDataType = string[] | any[];

export type UsersListResponseType = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  enabled: boolean;
  roleName: string;
  teamName: string;
  teamId: number;
  level: string;
};

export type TeamsDataResponseType = {
  teamName: string;
  teamLeaderName?: string;
};

export type TeamsDataType = {
  [key: number]: {
    teamLeaderName: string;
    teamName: string;
  };
};

export type CheckedAuditorsDataType = {
  [key: number]: AuditorType;
};
