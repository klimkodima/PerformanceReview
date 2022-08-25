import { getLargestRemainder } from 'src/utils';

import { ActivityLabelType } from 'src/store/ActivitiesPercentage';
import { CardActivityType, LabelDataType } from './types';

export const createPieData = (labels: ActivityLabelType[]): LabelDataType[] => {
  const percentagesList = labels.map(({ percentage }) => percentage);
  // round these percentage values into integers, ensuring that they equal 100% at the end.
  const correctRoundedPercentage = getLargestRemainder(percentagesList, 100);

  return labels.map(({ name }: ActivityLabelType, index) => ({
    name,
    value: correctRoundedPercentage ? correctRoundedPercentage[index] : 0
  }));
};

export const createCardData = (
  labels: ActivityLabelType[],
  totalTimeSpend: number
): CardActivityType => {
  const some = labels.map(({ totalTimeSpend }) => totalTimeSpend / 3600);
  const correctRoundedPercentage = getLargestRemainder(
    some,
    convertSecondsInHours(totalTimeSpend)
  );

  return {
    totalTimeSpend: convertSecondsInHours(totalTimeSpend),
    labels: labels
      .map(({ name }, index) => ({
        name,
        value: correctRoundedPercentage ? correctRoundedPercentage[index] : 0
      }))
      .sort((a: LabelDataType, b: LabelDataType) => b.value - a.value)
  };
};

export const convertSecondsInHours = (secondsTime: number): number =>
  Math.round(secondsTime / 3600);
