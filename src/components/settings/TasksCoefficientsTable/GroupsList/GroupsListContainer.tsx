import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectCurrentEditData,
  setFormWebsiteGroups,
  WebsiteType
} from 'src/store/TasksCoeff';
import {
  createListWebsitesData,
  createWebsiteGroupsFormData,
  filterIndividualCoefficientFirst
} from './helpers';
import GroupsList from './GroupsList';

import { ListWebsitesDataType, WebsiteGroupDataType } from './types';

type GroupsListContainerPropsType = {
  websiteGroup: string;
  website: WebsiteType[];
};

const GroupsListContainer = ({
  websiteGroup,
  website
}: GroupsListContainerPropsType): ReactElement => {
  const dispatch = useDispatch();
  const currentEditData = useSelector(selectCurrentEditData);

  const isWebsiteGroupMatch = websiteGroup === currentEditData.websiteGroup;

  const initialWebsiteGroupData: WebsiteGroupDataType = {
    checked: isWebsiteGroupMatch && !currentEditData.websiteName,
    websiteGroup
  };
  const initListWebsitesData: ListWebsitesDataType[] = createListWebsitesData({
    website,
    currentEditData,
    isWebsiteGroupMatch
  });

  const [ListWebsitesData, setListWebsitesData] =
    useState<ListWebsitesDataType[]>(initListWebsitesData);
  const [websiteGroupData, setWebsiteGroupData] =
    useState<WebsiteGroupDataType>(initialWebsiteGroupData);
  const [isWebsitesOpen, setIsWebsitesOpen] =
    useState<boolean>(isWebsiteGroupMatch);

  const handleWebsiteGroupClick = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setWebsiteGroupData({ ...websiteGroupData, checked: isChecked });

    if (!isChecked) {
      setListWebsitesData(
        ListWebsitesData.map((site) => ({ ...site, checked: isChecked }))
      );
    } else {
      setListWebsitesData(
        ListWebsitesData.map((site) =>
          site.hasIndividualCoefficient ? site : { ...site, checked: isChecked }
        )
      );
      setIsWebsitesOpen(true);
    }
  };
  const handleWebsiteClick = (
    event: ChangeEvent<HTMLInputElement>,
    currentWebsiteName: string
  ) => {
    setListWebsitesData(
      ListWebsitesData.map((site) =>
        site.websiteName === currentWebsiteName
          ? { ...site, checked: event.currentTarget.checked }
          : site
      )
    );
  };
  const handleOpenWebsitesClick = () => {
    setIsWebsitesOpen(!isWebsitesOpen);
  };

  useEffect(() => {
    const checkedSites = ListWebsitesData.map(
      ({ checked, hasIndividualCoefficient }) =>
        hasIndividualCoefficient ? null : checked
    );
    if (checkedSites.includes(false)) {
      setWebsiteGroupData({ ...websiteGroupData, checked: false });
    }
  }, [ListWebsitesData]);

  useEffect(() => {
    const WebsiteGroupsFormData = createWebsiteGroupsFormData(
      websiteGroupData,
      ListWebsitesData
    );
    dispatch(
      setFormWebsiteGroups({
        websiteGroups: WebsiteGroupsFormData,
        currentWebsiteGroup: websiteGroup
      })
    );
  }, [ListWebsitesData, websiteGroupData]);

  const filteredListWebsitesData =
    filterIndividualCoefficientFirst(ListWebsitesData);

  return (
    <GroupsList
      onWebsiteClick={handleWebsiteClick}
      onWebsiteGroupClick={handleWebsiteGroupClick}
      ListWebsitesData={filteredListWebsitesData}
      websiteGroupData={websiteGroupData}
      isWebsitesOpen={isWebsitesOpen}
      onOpenWebsitesClick={handleOpenWebsitesClick}
    />
  );
};

export default GroupsListContainer;
