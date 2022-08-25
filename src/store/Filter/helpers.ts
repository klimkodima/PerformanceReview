import { notNull } from 'src/utils/commonFunctions';
import { ROLE_NAME } from 'src/constants';

import {
  AuditorType,
  TeamsDataResponseType,
  TeamsDataType,
  UsersListResponseType
} from './types';

export const createTeamsData = (
  usersList: UsersListResponseType[],
  teamsData: TeamsDataResponseType[]
): TeamsDataType =>
  teamsData.reduce((acc, { teamLeaderName, teamName }) => {
    const currentTeamLeader = usersList.find(
      ({ fullName }) => fullName === teamLeaderName
    );

    return currentTeamLeader
      ? {
          ...acc,
          [currentTeamLeader.teamId]: {
            teamLeaderName,
            teamName
          }
        }
      : acc;
  }, {});

export const crateAuditorsData = (
  usersList: UsersListResponseType[],
  teamsData: TeamsDataResponseType[]
): AuditorType[] => {
  const teams: TeamsDataType = createTeamsData(usersList, teamsData);

  return usersList
    .map(({ level, enabled, id, fullName, roleName, teamId, teamName }) =>
      enabled &&
      (roleName === ROLE_NAME.AUDITOR || roleName === ROLE_NAME.TEAM_LEADER)
        ? {
            name: fullName,
            level,
            id,
            teamId,
            roleName,
            team: teamName,
            teamLeaderName: teams[teamId].teamLeaderName
          }
        : null
    )
    .filter(notNull);
};

export const crateTeamLeadAuditorsData = (
  usersList: UsersListResponseType[]
): AuditorType[] => {
  const teamLeader = usersList.find(
    ({ roleName }) => roleName === ROLE_NAME.TEAM_LEADER
  );

  return usersList
    .map(({ level, enabled, id, fullName, roleName, teamId, teamName }) =>
      enabled
        ? {
            name: fullName,
            level,
            id,
            teamId,
            roleName,
            team: teamName,
            teamLeaderName: teamLeader ? teamLeader.fullName : 'blank'
          }
        : null
    )
    .filter(notNull);
};
