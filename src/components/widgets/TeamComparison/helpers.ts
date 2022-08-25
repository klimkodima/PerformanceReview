import { TeamComparisonDataType, TeamComparisonType } from './types';

export const createTeamComparisonRows = (
  array: TeamComparisonDataType[]
): TeamComparisonType[] =>
  array.map(
    ({
      averagePerformance,
      averageValidity,
      averageHoursCorrespondence,
      teamName,
      averagePoints
    }) => ({
      leadName: teamName + 'name',
      name: teamName,
      points: averagePoints,
      performance: averagePerformance,
      validity: averageValidity,
      correspondence: averageHoursCorrespondence
    })
  );
