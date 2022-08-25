import { ChangeEvent, ReactElement, memo } from 'react';

import { FormControlLabel, Box } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { WebsiteGroupsAccordion } from 'src/components/common';
import { GroupsListItem } from '../GroupsListItem';
import { CustomCheckbox } from '../WebsiteCheckbox';

import { ListWebsitesDataType, WebsiteGroupDataType } from './types';

import './GroupList.scss';

type GroupListPropsType = {
  isWebsitesOpen: boolean;
  websiteGroupData: WebsiteGroupDataType;
  ListWebsitesData: ListWebsitesDataType[];
  onOpenWebsitesClick: () => void;
  onWebsiteGroupClick: (event: ChangeEvent<HTMLInputElement>) => void;
  onWebsiteClick: (
    event: ChangeEvent<HTMLInputElement>,
    currentWebsiteName: string
  ) => void;
};

const GroupsList = memo(
  ({
    websiteGroupData,
    ListWebsitesData,
    onWebsiteGroupClick,
    onWebsiteClick,
    isWebsitesOpen,
    onOpenWebsitesClick
  }: GroupListPropsType): ReactElement => (
    <div className='group-list'>
      <WebsiteGroupsAccordion
        expanded={isWebsitesOpen}
        expandIcon={
          <ArrowRightIcon
            className='arrow-icon'
            onClick={onOpenWebsitesClick}
          />
        }
        summary={
          <FormControlLabel
            label={
              <span className='group-list-label' data-testid='group-list-label'>
                {websiteGroupData.websiteGroup}
              </span>
            }
            control={
              <CustomCheckbox
                checked={websiteGroupData.checked}
                onChange={onWebsiteGroupClick}
              />
            }
          />
        }
      >
        <Box className='group-list__sites'>
          {ListWebsitesData.map(({ websiteName }, index) => (
            <GroupsListItem
              key={websiteName}
              hasIndividualCoefficient={
                ListWebsitesData[index].hasIndividualCoefficient
              }
              label={websiteName}
              checked={ListWebsitesData[index].checked}
              onChange={onWebsiteClick}
            />
          ))}
        </Box>
      </WebsiteGroupsAccordion>
    </div>
  )
);

export default GroupsList;

GroupsList.displayName = 'GroupsList';
