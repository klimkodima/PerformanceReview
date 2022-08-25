export type AuditorsDataType = {
  points: number;
  leadName: string;
  validity: number;
  performance: number;
  name: string;
  correspondence: number;
  support: number;
};

export type AuditorsStatisticsResponseType = {
  auditorStatisticWidgetDtoList: AuditorsStatisticsDataType[];
};

export type AuditorsStatisticsDataType = {
  auditorId: number;
  totalPoints: number;
  averagePerformance: number;
  averageValidity: number;
  supportAndAuditsTime: number;
  hoursCorrespondence: number;
};
