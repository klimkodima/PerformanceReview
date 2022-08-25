import {
  createListWebsitesData,
  createWebsiteGroupsFormData,
  filterIndividualCoefficientFirst
} from './helpers';
import { WebsiteGroupsType } from 'src/store/TasksCoeff';

import { ListWebsitesDataType } from './types';

const mockCurrentEditDataGroupClicked = {
  auditType: 'initial',
  groupCoefficient: 0.5,
  taskType: 'name',
  websiteCoefficient: undefined,
  websiteGroup: 'Directories',
  websiteName: undefined
};

const mockCurrentEditDataSiteClicked = {
  auditType: 'initial',
  groupCoefficient: 0.5,
  taskType: 'name',
  websiteCoefficient: 5,
  websiteGroup: 'Directories',
  websiteName: 'GPTS'
};

const mockWebsite = [
  {
    websiteName: 'agoda.com',
    coefficients: {
      initial: { email: 0.6, fax: 0.25, name: 3 },
      reaudit: { address: 10, fax: 10, name: 4 }
    }
  },
  {
    websiteName: 'GPTS',
    coefficients: {
      initial: { name: 5, address: 1, web: 1, fax: 0.3, email: 0.25 },
      reaudit: { name: 6, address: 6, web: 6, fax: 6, email: 6 }
    }
  },
  {
    websiteName: '1siteWithGroupCoefficient.com'
  },
  {
    websiteName: '2siteWithGroupCoefficient.com'
  }
];

describe('GroupList helpers', () => {
  test('returns only website group', () => {
    const mockListWebsitesData = [
      {
        websiteName: 'some',
        checked: false,
        hasIndividualCoefficient: true
      },
      {
        websiteName: 'some2',
        checked: true,
        hasIndividualCoefficient: false
      },
      {
        websiteName: 'some3',
        checked: true,
        hasIndividualCoefficient: false
      }
    ];

    const mockWebsiteGroupData = {
      checked: true,
      websiteGroup: 'OTA'
    };

    const result: WebsiteGroupsType | null = createWebsiteGroupsFormData(
      mockWebsiteGroupData,
      mockListWebsitesData
    );

    if (result) {
      expect(result.websiteGroup).toBe('OTA');
      expect(result.websites).toBeUndefined();
    }
  });

  test('return null if sites not checked', () => {
    const mockListWebsitesData = [
      {
        websiteName: 'some',
        checked: false,
        hasIndividualCoefficient: true
      },
      {
        websiteName: 'some2',
        checked: false,
        hasIndividualCoefficient: false
      },
      {
        websiteName: 'some3',
        checked: false,
        hasIndividualCoefficient: false
      }
    ];

    const mockWebsiteGroupData = {
      checked: false,
      websiteGroup: 'OTA'
    };

    const result: WebsiteGroupsType | null = createWebsiteGroupsFormData(
      mockWebsiteGroupData,
      mockListWebsitesData
    );

    if (result) {
      expect(result).toBe(null);
    }
  });

  test('always return group name', () => {
    const mockListWebsitesData = [
      {
        websiteName: 'some2',
        checked: true,
        hasIndividualCoefficient: false
      },
      {
        websiteName: 'some',
        checked: false,
        hasIndividualCoefficient: true
      },
      {
        websiteName: 'some3',
        checked: true,
        hasIndividualCoefficient: false
      }
    ];

    const mockWebsiteGroupData = {
      checked: false,
      websiteGroup: 'OTA'
    };

    const result: WebsiteGroupsType | null = createWebsiteGroupsFormData(
      mockWebsiteGroupData,
      mockListWebsitesData
    );

    if (result) {
      expect(result.websiteGroup).toBe('OTA');
      expect(result.websites?.length).toBe(2);
    }
  });

  test('checked only group coefficients', () => {
    const result: ListWebsitesDataType[] = createListWebsitesData({
      isWebsiteGroupMatch: true,
      currentEditData: mockCurrentEditDataGroupClicked,
      website: mockWebsite
    });

    expect(result[0].checked).toBe(false);
    expect(result[1].checked).toBe(false);
    expect(result[2].checked).toBe(true);
    expect(result[3].checked).toBe(true);
  });

  test('checked only current site', () => {
    const result: ListWebsitesDataType[] = createListWebsitesData({
      isWebsiteGroupMatch: true,
      currentEditData: mockCurrentEditDataSiteClicked,
      website: mockWebsite
    });

    expect(result[0].checked).toBe(false);
    expect(result[1].checked).toBe(true);
    expect(result[2].checked).toBe(false);
    expect(result[3].checked).toBe(false);
  });

  test('correct individual coefficients', () => {
    const result: ListWebsitesDataType[] = createListWebsitesData({
      isWebsiteGroupMatch: true,
      currentEditData: mockCurrentEditDataSiteClicked,
      website: mockWebsite
    });

    expect(result[0].hasIndividualCoefficient).toBe(true);
    expect(result[1].hasIndividualCoefficient).toBe(true);
    expect(result[2].hasIndividualCoefficient).toBe(false);
    expect(result[3].hasIndividualCoefficient).toBe(false);
  });

  test('place sites with individual coefficients in first place', () => {
    const mockListWebsitesData = [
      {
        websiteName: 'some2',
        checked: true,
        hasIndividualCoefficient: false
      },
      {
        websiteName: 'some',
        checked: false,
        hasIndividualCoefficient: true
      },
      {
        websiteName: 'some3',
        checked: true,
        hasIndividualCoefficient: false
      }
    ];

    const result = filterIndividualCoefficientFirst(mockListWebsitesData);

    expect(result[0].hasIndividualCoefficient).toBe(true);
    expect(result[1].hasIndividualCoefficient).toBe(false);
    expect(result[2].hasIndividualCoefficient).toBe(false);
  });

  test('filter must be immutable', () => {
    const mockListWebsitesData = [
      {
        websiteName: 'some2',
        checked: true,
        hasIndividualCoefficient: false
      },
      {
        websiteName: 'some',
        checked: false,
        hasIndividualCoefficient: true
      },
      {
        websiteName: 'some3',
        checked: true,
        hasIndividualCoefficient: false
      }
    ];

    const result = filterIndividualCoefficientFirst(mockListWebsitesData);

    expect(mockListWebsitesData[0].hasIndividualCoefficient).toBe(false);
    expect(mockListWebsitesData[1].hasIndividualCoefficient).toBe(true);
    expect(mockListWebsitesData[2].hasIndividualCoefficient).toBe(false);
    expect(result[0].hasIndividualCoefficient).toBe(true);
    expect(result[1].hasIndividualCoefficient).toBe(false);
    expect(result[2].hasIndividualCoefficient).toBe(false);
  });
});
