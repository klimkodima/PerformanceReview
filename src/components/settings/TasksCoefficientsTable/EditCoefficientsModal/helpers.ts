import {
  TaskCoefficientsDataType,
  WebsiteGroupType,
  WebsitesType,
  WebsiteType
} from 'src/store/TasksCoeff';

export const createWebsiteGroupsData = (
  websitesData: WebsitesType[],
  taskCoefficients: TaskCoefficientsDataType[]
): WebsiteGroupType[] => {
  const websiteGroups: WebsiteGroupType[] = [];

  for (let i = 0; i < websitesData.length; i++) {
    const currentWebsitesData = websitesData[i].websites.map(
      ({ websiteName }) => ({ websiteName })
    );

    websiteGroups[i] = {
      websiteGroup: websitesData[i].websiteGroup,
      groupCoefficients: {
        initial: taskCoefficients[i].taskCoefficientDtos.reduce(
          (acc, { taskTypeName, initialCoefficient }) => ({
            ...acc,
            [taskTypeName]: initialCoefficient
          }),
          {}
        ),
        reaudit: taskCoefficients[i].taskCoefficientDtos.reduce(
          (acc, { taskTypeName, reauditCoefficient }) => ({
            ...acc,
            [taskTypeName]: reauditCoefficient
          }),
          {}
        )
      },
      website: currentWebsitesData.map(({ websiteName }): WebsiteType => {
        const websiteIndex = taskCoefficients[
          i
        ].websiteCoefficientDtos.findIndex(
          (item) => item.websiteName === websiteName
        );

        if (websiteIndex >= 0) {
          return {
            websiteName,
            coefficients: {
              initial: taskCoefficients[i].websiteCoefficientDtos[
                websiteIndex
              ].taskCoefficientDtos.reduce(
                (acc, { taskTypeName, initialCoefficient }) => ({
                  ...acc,
                  [taskTypeName]: initialCoefficient
                }),
                {}
              ),
              reaudit: taskCoefficients[i].websiteCoefficientDtos[
                websiteIndex
              ].taskCoefficientDtos.reduce(
                (acc, { taskTypeName, reauditCoefficient }) => ({
                  ...acc,
                  [taskTypeName]: reauditCoefficient
                }),
                {}
              )
            }
          };
        } else {
          return { websiteName };
        }
      })
    };
  }

  return websiteGroups;
};
