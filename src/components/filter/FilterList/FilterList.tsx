import { ReactElement, memo } from 'react';

import { List, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

import FilterInput from '../FilterInput/FilterInput';
import { FilterListItem } from '../FilterListItem';
import { FilterOptionCheckbox } from '../FilterOptionCheckbox';
import { FilterPopUp } from '../FilterPopUp';

import { FilterListPropsType } from '../types';

import './FilterList.scss';

const FilterList = memo(
  ({
    title,
    filter,
    filteredData,
    checkedItems,
    onAddFilterClick,
    isOpen,
    closeDrawer
  }: FilterListPropsType): ReactElement => {
    const { t } = useTranslation();
    const auditor = t('filter.auditor');
    return (
      <div className='filter-list'>
        <List data-testid='filter-list-test'>
          <div className='filter-list__name'>
            <Typography className='title'>{title}</Typography>
            <IconButton
              className={`plus-button filter-list-button-${title}`}
              onClick={onAddFilterClick}
            >
              +
            </IconButton>
          </div>
          {checkedItems.map(({ name, isNotAvailableToFilterBy }) => (
            <FilterListItem
              name={name}
              key={name}
              group={title}
              isNotAvailableToFilterBy={isNotAvailableToFilterBy}
            />
          ))}
          <FilterPopUp closeDrawer={closeDrawer} isOpen={isOpen}>
            {title === auditor && <FilterInput />}
            {filter.map((item) => (
              <FilterOptionCheckbox
                key={item}
                name={item}
                group={title}
                filteredData={filteredData}
                checkedItems={checkedItems.map(({ name }) => name)}
              />
            ))}
          </FilterPopUp>
        </List>
      </div>
    );
  }
);

export default FilterList;

FilterList.displayName = 'FilterList';
