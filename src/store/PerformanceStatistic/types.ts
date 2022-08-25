export type PerfStatType = {
  from: string;
  juniorsPoints: number;
  middlesPoints: number;
  seniorsPoints: number;
  to: string;
  usersPointsDots?: { userName: string; userPoints: number }[];
};

export type PerfStatDataType = {
  points: PerfStatType[];
};

export type PerfStatOmitType = Omit<PerfStatType, 'from' | 'to'>;
