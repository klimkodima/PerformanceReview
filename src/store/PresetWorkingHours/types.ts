export type PresetWorkingHoursDataType = {
  id: string;
  label: PresetWorkingHoursCellInfoType;
  time: PresetWorkingHoursCellInfoType;
};

export type PresetWorkingHoursCellInfoType = {
  value: string;
  isError: boolean;
  errorText: string;
};

export type PresetWorkingHoursInfoType = {
  label: string;
  time: number;
};
