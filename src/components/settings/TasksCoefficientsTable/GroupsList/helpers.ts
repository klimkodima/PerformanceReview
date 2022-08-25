import { WebsiteGroupsType } from 'src/store/TasksCoeff';

import {
  ICreateListWebsitesData,
  ListWebsitesDataType,
  WebsiteGroupDataType
} from './types';

export const createWebsiteGroupsFormData = (
  websiteGroupData: WebsiteGroupDataType,
  ListWebsitesData: ListWebsitesDataType[]
): WebsiteGroupsType | null => {
  const webData: { websiteGroup: string } = {
    websiteGroup: websiteGroupData.websiteGroup
  };

  const websites =
    ListWebsitesData &&
    ListWebsitesData.map(({ checked, websiteName }) =>
      checked ? { websiteName } : { websiteName: '' }
    );
  const sitesData = {
    websites: websites.filter(({ websiteName }) => websiteName)
  };

  if (websiteGroupData.checked) {
    return sitesData.websites.length ? { ...webData } : null;
  } else {
    return sitesData.websites.length ? { ...webData, ...sitesData } : null;
  }
};

export const createListWebsitesData = ({
  isWebsiteGroupMatch,
  website,
  currentEditData
}: ICreateListWebsitesData): ListWebsitesDataType[] =>
  website.map(({ websiteName, coefficients }) => {
    let checked = false;
    let hasIndividualCoefficient = false;

    if (websiteName === currentEditData.websiteName && isWebsiteGroupMatch) {
      checked = true;
    }
    if (
      coefficients &&
      coefficients[currentEditData.auditType][currentEditData.taskType]
    ) {
      hasIndividualCoefficient = true;
    }
    if (
      !currentEditData.websiteName &&
      isWebsiteGroupMatch &&
      !hasIndividualCoefficient
    ) {
      checked = true;
    }

    return {
      websiteName,
      checked,
      hasIndividualCoefficient
    };
  });

export const filterIndividualCoefficientFirst = (
  ListWebsitesData: ListWebsitesDataType[]
): ListWebsitesDataType[] =>
  [...ListWebsitesData].sort((a, b) =>
    a.hasIndividualCoefficient > b.hasIndividualCoefficient ? -1 : 1
  );
