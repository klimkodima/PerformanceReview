import { UserInfoType } from 'src/store/Users';
import { TeamsDataResponseType } from 'src/store/Filter/types';
import { TeamsDataType } from './types';

export const createTeams = (
  users: UserInfoType[],
  teams: TeamsDataResponseType[]
): TeamsDataType[] => {
  const uniqueTeams = Array.from(
    new Map(users.map((item) => [item.teamName, item])).values()
  );

  return teams.map(({ teamName, teamLeaderName }) => {
    const currentValues = uniqueTeams.find(
      (team) => team.teamName === teamName
    );
    return {
      teamName,
      teamLeaderName,
      teamId: currentValues?.teamId ? currentValues?.teamId : 0
    };
  });
};
