import { useState, MouseEvent, useMemo, ReactElement, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableContainer
} from '@mui/material/';

import {
  ascendingSort,
  descendingSort,
  HEAD_CELL_NAMES,
  VALUE_TYPES,
  teamLeadBonus,
  CELL_COLOR_STYLE
} from './constants';

import { FilterDataType } from 'src/store/Filter';
import {
  Order,
  HeadCellType,
  objectKeyType,
  LeadInfoType,
  CreateRowStyleType
} from './types';

import './CommonTable.scss';

const {
  nameColumn,
  performanceColumn,
  validityColumn,
  correspondenceColumn,
  supportColumn
} = HEAD_CELL_NAMES;

const sortData = <Type extends objectKeyType>(
  data: Type[],
  order: Order,
  orderBy: keyof Type
): Type[] =>
  data.sort((a: Type, b: Type): number => {
    if (typeof a[orderBy] === 'number' && typeof b[orderBy] === 'number') {
      return order === ascendingSort
        ? Number(b[orderBy]) - Number(a[orderBy])
        : Number(a[orderBy]) - Number(b[orderBy]);
    }
    if (typeof a[orderBy] === 'string' && typeof b[orderBy] === 'string') {
      return order === ascendingSort
        ? String(a[orderBy]).localeCompare(String(b[orderBy]))
        : String(b[orderBy]).localeCompare(String(a[orderBy]));
    }
    return 0;
  });

const getCellTextColor = (
  value: string | number,
  cellType: string,
  minValue: number,
  maxValue: number
): string => {
  const { minValueStyle, maxValueStyle, commonValueStyle } = CELL_COLOR_STYLE;

  if (cellType !== nameColumn) {
    if (value === maxValue) {
      return maxValueStyle;
    }
    if (value === minValue) {
      return minValueStyle;
    }
  }
  return commonValueStyle;
};

const getValueType = (titleName: string, value: number): string => {
  const percentValues = [validityColumn, correspondenceColumn];
  const { task, tasks, percent, hours } = VALUE_TYPES;

  if (titleName === performanceColumn) {
    return value === 1 ? task : tasks;
  } else if (percentValues.includes(titleName)) {
    return percent;
  } else if (titleName === supportColumn) {
    return hours;
  } else return '';
};

const createRowStyle = ({
  currentLeadTeamName,
  rowsCount,
  teamName,
  checkedTeams,
  isTeamComparisonLead
}: CreateRowStyleType): string => {
  if (currentLeadTeamName === teamName && isTeamComparisonLead) {
    return 'comparison-table-lead-team comparison-table-row';
  } else if (checkedTeams.length === rowsCount && !isTeamComparisonLead) {
    return 'comparison-table-row';
  } else {
    return 'comparison-table-row';
  }
};

type RowsType<Type> = {
  sortedRows: Type[];
  minValues: Type;
  maxValues: Type;
  headCells: HeadCellType[];
  isTeamComparisonLead: boolean;
  currentLeadTeamName: string;
  checkedTeams: FilterDataType;
};

const ComparisonTableBody = <Type extends objectKeyType>(
  props: RowsType<Type>
): ReactElement => {
  const {
    sortedRows,
    minValues,
    maxValues,
    headCells,
    isTeamComparisonLead,
    currentLeadTeamName,
    checkedTeams
  } = props;

  return (
    <TableBody>
      {sortedRows.map((row) => {
        const rowStyle = createRowStyle({
          currentLeadTeamName,
          rowsCount: sortedRows.length,
          teamName: row.name.toString(),
          checkedTeams,
          isTeamComparisonLead
        });

        return (
          <TableRow key={row.name} hover className={rowStyle}>
            {Object.keys(row)
              .slice(1)
              .map((cell, index) => {
                const cellColor = getCellTextColor(
                  row[cell],
                  cell,
                  minValues[cell] as number,
                  maxValues[cell] as number
                );
                const valueType = getValueType(
                  headCells[index].id,
                  row[cell] as number
                );

                return (
                  <TableCell
                    key={`${row.name}${cell}`}
                    align='center'
                    className={cellColor}
                    data-testid={`comparison-table-${cell.toString()}-cell`}
                  >
                    {row[cell]}
                    {valueType}
                  </TableCell>
                );
              })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

type CommonTableTypes<Types> = {
  data: Types[];
  headCells: HeadCellType[];
  defaultOrderBy: string;
  headerName: string;
  isTeamComparisonLead: boolean;
  currentLeadInfo?: LeadInfoType;
  checkedTeams?: FilterDataType;
  placeholderText?: string;
};

const CommonTable = <Types extends objectKeyType>(
  props: CommonTableTypes<Types>
): ReactElement => {
  const {
    data,
    headCells,
    headerName,
    defaultOrderBy,
    isTeamComparisonLead,
    currentLeadInfo,
    checkedTeams,
    placeholderText
  } = props;
  const [order, setOrder] = useState<Order>(ascendingSort);
  const [orderBy, setOrderBy] = useState<keyof Types>(defaultOrderBy);
  const [maxValues, setMaxValues] = useState<objectKeyType>({});
  const [minValues, setMinValues] = useState<objectKeyType>({});

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAscending = orderBy === property && order === ascendingSort;

    setOrder(isAscending ? descendingSort : ascendingSort);
    setOrderBy(property);
  };

  const sortedRows = useMemo(
    () => sortData(data, order, orderBy),
    [order, orderBy, data]
  );

  const getMinMaxValues = (): void => {
    const tempMinValues: objectKeyType = { ...data[0] };
    const tempMaxValues: objectKeyType = { ...data[0] };

    for (const row in data[0]) {
      if (typeof data[0][row] === 'string') {
        tempMinValues[row] = '';
        tempMaxValues[row] = '';
      } else {
        tempMinValues[row] = +Infinity;
        tempMaxValues[row] = -Infinity;
      }
    }

    for (const row of data) {
      for (const key of Object.keys(row)) {
        if (row[key] > tempMaxValues[key]) {
          tempMaxValues[key] = row[key];
        }
        if (row[key] < tempMinValues[key]) {
          tempMinValues[key] = row[key];
        }
      }
    }
    setMaxValues(tempMaxValues);
    setMinValues(tempMinValues);
  };

  useEffect(() => {
    getMinMaxValues();
  }, [data]);

  return (
    <div
      className='comparison-table-container'
      data-testid='comparison-table-container'
    >
      <div className='comparison-table-wrapper'>
        <h2
          className='comparison-table-header'
          data-testid='comparison-table-header'
        >
          {headerName}
        </h2>
        {placeholderText ? (
          <div className='comparison-table-placeholder'>
            <p>{placeholderText}</p>
          </div>
        ) : (
          <TableContainer className='comparison-table'>
            <Table stickyHeader className='comparison-table-content'>
              <TableHead className='comparison-table-head'>
                <TableRow>
                  {headCells.map(({ id, label }) => (
                    <TableCell
                      data-testid='comparison-table-head-cell'
                      key={id}
                      align='center'
                      className='comparison-table-head-cell'
                    >
                      <TableSortLabel
                        active={orderBy === id}
                        direction={orderBy === id ? order : ascendingSort}
                        onClick={(event) => handleRequestSort(event, id)}
                      >
                        {label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <ComparisonTableBody
                sortedRows={sortedRows}
                minValues={minValues}
                maxValues={maxValues}
                headCells={headCells}
                isTeamComparisonLead={isTeamComparisonLead}
                currentLeadTeamName={
                  currentLeadInfo ? currentLeadInfo.currentLeadTeamName : ''
                }
                checkedTeams={checkedTeams ? checkedTeams : []}
              />
            </Table>
          </TableContainer>
        )}
        {isTeamComparisonLead && (
          <div
            className='comparison-table-lead-bonus'
            data-testid='comparison-table-lead-bonus'
          >
            <span data-testid='comparison-table-lead-bonus-text'>
              {teamLeadBonus}
            </span>
            <div>
              {currentLeadInfo?.bonusPercent}
              {currentLeadInfo?.bonusPercent
                ? VALUE_TYPES.percent
                : VALUE_TYPES.dash}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonTable;
