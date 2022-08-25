export type HoursCorType = {
  id: string;
  status: CellType;
  icon: CellType;
  gap: CellType;
  confirmationRate: CellType;
  tooltipText: CellType;
};

export type CellType = {
  value: string;
  isError: boolean;
  errorText: string;
};

export type HoursCorInputType = {
  status: string;
  icon: string;
  intervalStart: number;
  intervalEnd: number;
  confirmationRate: number;
  tooltip: string;
};
