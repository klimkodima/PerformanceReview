import { CheckedAuditorsDataType } from 'src/store/Filter/types';
import { AuditorsDataType, AuditorsStatisticsDataType } from './types';

export const createAuditorsStatisticsRows = (
  array: AuditorsStatisticsDataType[],
  checkedAuditors: CheckedAuditorsDataType
): AuditorsDataType[] =>
  array.map(
    ({
      averagePerformance,
      averageValidity,
      hoursCorrespondence,
      supportAndAuditsTime,
      totalPoints,
      auditorId
    }) => ({
      leadName: checkedAuditors[auditorId].teamLeaderName,
      name: checkedAuditors[auditorId].name,
      points: totalPoints,
      performance: averagePerformance,
      validity: averageValidity,
      support: supportAndAuditsTime,
      correspondence: hoursCorrespondence
    })
  );
