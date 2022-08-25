import { CurrentEditDataType, WebsiteType } from 'src/store/TasksCoeff';

export type ListWebsitesDataType = {
  websiteName: string;
  checked: boolean;
  hasIndividualCoefficient: boolean;
};

export type WebsiteGroupDataType = {
  checked: boolean;
  websiteGroup: string;
};

export interface ICreateListWebsitesData {
  website: WebsiteType[];
  currentEditData: CurrentEditDataType;
  isWebsiteGroupMatch: boolean;
}
