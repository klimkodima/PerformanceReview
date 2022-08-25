export type WebsiteGroupType = {
  websiteGroup: string;
  groupCoefficients: groupCoefficientsType;
  website: WebsiteType[];
};

export type WebsiteType = {
  websiteName: string;
  coefficients?: singleCoefficientsType;
};

export type singleCoefficientsType = {
  initial: {
    [key: string]: number | undefined | null;
  };
  reaudit: {
    [key: string]: number | undefined | null;
  };
};

export type groupCoefficientsType = {
  initial: {
    [key: string]: number;
  };
  reaudit: {
    [key: string]: number;
  };
};

export type CurrentEditDataType = {
  taskType: string;
  auditType: string;
  websiteCoefficient: number | undefined | null;
  groupCoefficient: number;
  websiteGroup: string;
  websiteName?: string;
};

export type WebsiteGroupsType = {
  websiteGroup: string;
  websites?: Pick<WebsiteType, 'websiteName'>[];
};

export type EditFormValuesType = {
  websiteGroups: WebsiteGroupsType[];
  taskName: string;
  initialCoefficient?: number;
  reauditCoefficient?: number;
};

export type TaskCoefficientsDataType = {
  websiteGroupName: string;
  taskCoefficientDtos: TaskCoefficientType[];
  websiteCoefficientDtos: WebsiteCoefficientType[];
};

export type TaskCoefficientType = {
  taskTypeName: string;
  initialCoefficient: number;
  reauditCoefficient: number;
};

export type WebsiteTaskCoefficientType = {
  taskTypeName: string;
  initialCoefficient?: number;
  reauditCoefficient?: number;
};

export type WebsiteCoefficientType = {
  websiteName: string;
  taskCoefficientDtos: WebsiteTaskCoefficientType[];
};

export type TaskTypeDataType = {
  taskType: string;
};

export type WebsitesType = {
  websiteGroup: string;
  websites: Pick<WebsiteCoefficientType, 'websiteName'>[];
};
