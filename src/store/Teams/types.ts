export type TeamType = {
  id: string;
  teamName: CellType;
  teamLeaderName: CellType;
};

export type CellType = {
  value: string;
  isError: boolean;
  errorText: string;
};

export type TeamInputType = {
  teamName: string;
  teamLeaderName: string;
};

export type TeamInfoType = {
  id: string;
  teamName: string;
  teamLeaderName: string;
};
