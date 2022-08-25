import { ReactElement, useState, useMemo, useEffect } from 'react';

import { t } from 'i18next';
import {
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';

import { Search } from 'src/components/common';
import { useDebounce } from 'src/components/hooks';
import {
  ascendingSort,
  descendingSort
} from 'src/components/common/CommonTable/constants';
import { HEADER_CELLS } from './constants';
import { getRangeColor } from './helpers';
import accuracyByPropertyData from './mockAccuracyByProperty.json';

import { Order } from 'src/components/common/CommonTable/types';
import { AccuracyByPropertyType, TableHeaderCellsType } from './types';

import './AccuracyByProperty.scss';

const AccuracyByProperty = (): ReactElement => {
  const [searchValue, setSearchValue] = useState<string>('');
  const handleSearchValue = (value: string): void => {
    setSearchValue(value);
  };
  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  const [searchAccuracy, setSearchAccuracy] = useState(accuracyByPropertyData);

  const handleSearchAccuracy = () => {
    const accuracy = accuracyByPropertyData.filter((accuracy) =>
      accuracy.property.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchAccuracy(accuracy);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearchAccuracy();
    } else {
      setSearchAccuracy(accuracyByPropertyData);
    }
  }, [debouncedSearchTerm]);

  const [orderBy, setOrderBy] = useState<string>(
    t('accuracy_by_property.score_label')
  );
  const [order, setOrder] = useState<Order>(ascendingSort);

  const handleRequestSort = (property: string): void => {
    const isAscending = orderBy === property && order === ascendingSort;

    setOrder(isAscending ? descendingSort : ascendingSort);
    setOrderBy(property);
  };

  const sortAccuracyData = (
    accuracy: AccuracyByPropertyType[],
    order: Order,
    orderBy: string
  ) => {
    if (orderBy === t('accuracy_by_property.score_label'))
      return order === ascendingSort
        ? accuracy.sort((a, b) => b.score - a.score)
        : accuracy.sort((a, b) => a.score - b.score);
  };

  const sortedAccuracyRows = useMemo(
    () => sortAccuracyData(searchAccuracy, order, orderBy),
    [order, orderBy, searchAccuracy]
  );

  const accuracyByProperty = !searchValue ? sortedAccuracyRows : searchAccuracy;

  return (
    <div className='widgets-wrapper accuracy'>
      <div className='accuracy__header-block'>
        <h2>{t('accuracy_by_property.title')}</h2>
        <Search
          handleSearchValue={handleSearchValue}
          searchValue={searchValue}
          placeholder={t('accuracy_by_property.search_placeholder')}
        />
      </div>
      <TableContainer className='accuracy__table'>
        <Table aria-label='table'>
          <TableHead>
            <TableRow>
              {HEADER_CELLS.map(
                ({ name, isShowIcon }: TableHeaderCellsType) => (
                  <TableCell key={name}>
                    {isShowIcon && (
                      <TableSortLabel
                        active={orderBy === name}
                        direction={orderBy === name ? order : ascendingSort}
                        onClick={() => handleRequestSort(name)}
                      >
                        {name}
                      </TableSortLabel>
                    )}
                    {!isShowIcon && name}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {accuracyByProperty?.map(({ property, score }) => (
              <TableRow key={property}>
                {/* Replace with img from the backend */}
                <TableCell>icon</TableCell>
                <TableCell>
                  <div className='accuracy__cell-block'>
                    <span>{property}</span>
                    <span>{score}%</span>
                  </div>
                  <Slider
                    defaultValue={score}
                    aria-label='Default'
                    disabled
                    className={getRangeColor(score)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccuracyByProperty;
