import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getTeamComparisonData } from 'src/api';
import { selectFiltersData } from 'src/store/Filter/selectors';
import { createTeamComparisonRows } from './helpers';

import { PickedDateType } from 'src/store/DateFilter';
import { TeamComparisonResponseType, TeamComparisonType } from './types';

export const useTeamComparison = (
  pickedDate: PickedDateType
): { teamsRows: TeamComparisonType[]; currentLeadTeamName: string } => {
  const [teamsRows, setTeamsRows] = useState<TeamComparisonType[]>([]);
  const filtersData = useSelector(selectFiltersData);
  const currentLeadTeamName = filtersData[0] ? filtersData[0].team : '';

  useEffect(() => {
    const fetchTeamComparison = async () => {
      const { stats }: TeamComparisonResponseType = await getTeamComparisonData(
        {
          from: pickedDate.startDate,
          to: pickedDate.finishDate
        }
      );

      setTeamsRows(createTeamComparisonRows(stats));
    };

    if (pickedDate.finishDate !== '' && pickedDate.startDate !== '') {
      fetchTeamComparison().catch(console.error);
    }
  }, [pickedDate]);

  return { teamsRows, currentLeadTeamName };
};
