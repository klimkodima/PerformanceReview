import { FC, ReactElement, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  filterByAuditor,
  filterByLevel,
  filterByTeam,
  selectIsDisabledReset,
  setFilteredAuditorsData
} from 'src/store/Filter';
import FilterList from './FilterList';
import { FILTERS_NAMES } from '../data';

import { FilterListContainerPropsType } from '../types';

const FilterListContainer: FC<FilterListContainerPropsType> = ({
  filter,
  title,
  filteredData,
  checkedItems
}: FilterListContainerPropsType): ReactElement => {
  const dispatch = useDispatch();
  const isDisabledReset = useSelector(selectIsDisabledReset);
  const [isOpened, setIsOpened] = useState(false);
  const toggleDrawerStatus = () => setIsOpened(true);
  const closeDrawer = () => setIsOpened(false);

  const sortedCheckedItems = checkedItems.map((name) => ({
    name,
    isNotAvailableToFilterBy:
      !filteredData.includes(name) && Boolean(filteredData.length)
  }));

  useEffect(() => {
    if (filter.length === 1 && !checkedItems.length && !isDisabledReset) {
      switch (title) {
        case FILTERS_NAMES.TEAM:
          dispatch(filterByTeam(filter[0]));
          break;
        case FILTERS_NAMES.LEVEL:
          dispatch(filterByLevel(filter[0]));
          break;
        case FILTERS_NAMES.AUDITOR:
          dispatch(filterByAuditor(filter[0]));
          break;
        default:
          break;
      }
    }
  }, [isDisabledReset]);

  useEffect(() => {
    if (!isOpened) {
      dispatch(setFilteredAuditorsData());
    }
  }, [isOpened]);

  return (
    <FilterList
      title={title}
      filter={filter}
      filteredData={filteredData}
      checkedItems={sortedCheckedItems}
      onAddFilterClick={toggleDrawerStatus}
      closeDrawer={closeDrawer}
      isOpen={isOpened}
    />
  );
};

export default FilterListContainer;
