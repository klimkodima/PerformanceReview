import { FilterDataType } from '../../../store/Filter';

export type objectKeyType = { [key: string]: string | number };

export type HeadCellType = {
  id: string;
  label: string;
};

export type Order = 'asc' | 'desc';

export type LeadInfoType = {
  currentLeadTeamName: string;
  bonusPercent: number | string;
};

export type CreateRowStyleType = {
  currentLeadTeamName: string;
  rowsCount: number;
  teamName: string;
  checkedTeams: FilterDataType;
  isTeamComparisonLead: boolean;
};
