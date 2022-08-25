export type ActivityLabelType = {
  name: string;
  totalTimeSpend: number;
  percentage: number;
};

export type AuditActivitiesType = {
  totalTimeSpend: number;
  labels: ActivityLabelType[];
};

export type TeamActivitiesPercentageType = {
  teamName: string;
  labels: Omit<ActivityLabelType, 'totalTimeSpend'>[];
};

export type TeamActivitiesResponseType = {
  activitiesTeam: TeamActivitiesPercentageType[];
};
