import { ReactElement, memo } from 'react';

import { useDispatch } from 'react-redux';
import { Typography, ListItem, IconButton } from '@mui/material';

import { createFormattedString } from 'src/utils/createFormattedString';
import {
  filterByTeam,
  filterByLevel,
  filterByAuditor,
  checkResetEnabled,
  setFilteredAuditorsData
} from 'src/store/Filter/reducer';
import { FILTERS_NAMES } from '../data';

import { ClickHandlerFunction } from '../types';

import './FilterListItem.scss';

type FilterListItemPropsType = {
  name: string;
  group: string;
  isNotAvailableToFilterBy: boolean;
};

const FilterListItem = memo(
  ({
    name,
    group,
    isNotAvailableToFilterBy
  }: FilterListItemPropsType): ReactElement => {
    const dispatch = useDispatch();

    const clickHandler: ClickHandlerFunction = (e) => {
      const { name, value } = e.target as HTMLButtonElement;

      switch (value) {
        case FILTERS_NAMES.TEAM:
          dispatch(filterByTeam(name));
          break;
        case FILTERS_NAMES.LEVEL:
          dispatch(filterByLevel(name));
          break;
        case FILTERS_NAMES.AUDITOR:
          dispatch(filterByAuditor(name));
          break;
        default:
          break;
      }
      dispatch(setFilteredAuditorsData());
      dispatch(checkResetEnabled());
    };

    const formattedName =
      group === FILTERS_NAMES.LEVEL ? createFormattedString(name) : name;

    const listItemStyle = isNotAvailableToFilterBy
      ? 'filter-list-item__filter-name filter-list-item__unavailable-item'
      : 'filter-list-item__filter-name';

    return (
      <ListItem>
        <div className='filter-list-item'>
          <Typography
            className={listItemStyle}
            data-testid='filter-list-item__filter-name'
          >
            {formattedName}
          </Typography>
          <IconButton
            name={name}
            value={group}
            className='filter-list-item__delete-button'
            onClick={(e) => clickHandler(e)}
          >
            +
          </IconButton>
        </div>
      </ListItem>
    );
  }
);

export default FilterListItem;

FilterListItem.displayName = 'FilterListItem';
