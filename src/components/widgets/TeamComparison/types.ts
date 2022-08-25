export type TeamComparisonType = {
  points: number;
  leadName: string;
  validity: number;
  performance: number;
  name: string;
  correspondence: number;
};

export type TeamComparisonDataType = {
  teamName: string;
  averagePerformance: number;
  averageValidity: number;
  averageHoursCorrespondence: number;
  averagePoints: number;
};

export type TeamComparisonResponseType = {
  stats: TeamComparisonDataType[];
};
