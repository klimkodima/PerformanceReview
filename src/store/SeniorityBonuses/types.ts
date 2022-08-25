export type BonusesDataType = {
  id: string;
  experience: CellInfoType;
  bonus: CellInfoType;
};

export type CellInfoType = {
  value: string;
  isError: boolean;
  errorText: string;
};

export type SeniorityBonusCreateType = Omit<SeniorityBonusType, 'id'>;

export type SeniorityBonusType = {
  startInterval: number;
  bonusPercentage: number;
  id: number;
};
