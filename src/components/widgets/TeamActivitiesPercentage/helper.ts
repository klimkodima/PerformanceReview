import { getLargestRemainder } from 'src/utils/getLargestRemainder';

import { FilterDataType } from 'src/store/Filter';
import { TeamActivitiesPercentageType } from 'src/store/ActivitiesPercentage/types';
import { StatisticCircleDataType } from './types';

export const filterTeams = (
  data: StatisticCircleDataType[],
  filter: FilterDataType
): StatisticCircleDataType[] => {
  let filteredData: StatisticCircleDataType[] = data;

  if (filter.length === 1) {
    const tempo = filteredData.filter((data) => data.title === filter[0]);
    filteredData = [
      ...tempo,
      ...data.filter((data) => data.title !== filter[0])
    ];
  }

  if (filter.length >= 2) {
    const tempo = filteredData.filter((data) => filter.includes(data.title));
    tempo.sort((a, b) =>
      a.title.toLowerCase() <= b.title.toLowerCase() ? -1 : 1
    );
    filteredData = [
      ...tempo,
      ...data.filter((data) => !filter.includes(data.title))
    ];
  }
  return filteredData;
};

export const createTeamActivitiesPieData = (
  teamActivities: TeamActivitiesPercentageType[]
): StatisticCircleDataType[] =>
  teamActivities.map(({ teamName, labels }) => {
    const percentagesList = labels.map(({ percentage }) => percentage);
    // round these percentage values into integers, ensuring that they equal 100% at the end.
    const correctRoundedPercentage = getLargestRemainder(percentagesList, 100);

    return {
      title: teamName,
      data: labels.map(({ name }, index) => ({
        value: correctRoundedPercentage ? correctRoundedPercentage[index] : 0,
        name
      }))
    };
  });
