import { ChangeEvent, ReactElement, memo } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import { createFormattedString } from 'src/utils';
import TasksCoefficientsRow from './TasksCoefficientsRow';

import {
  TaskCoefficientsDataType,
  TaskTypeDataType
} from 'src/store/TasksCoeff';
import { SettingsPermissionType } from 'src/store/App';

import './TasksCoefficientsRow.scss';

type TasksCoefficientsTablePropsType = {
  headerTableCellTypes: TaskTypeDataType[];
  headerTableCellMain: string[];
  settingsPermission: SettingsPermissionType;
  taskCoefficientsData: TaskCoefficientsDataType[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TasksCoefficientsTable = memo(
  ({
    headerTableCellTypes,
    headerTableCellMain,
    taskCoefficientsData,
    settingsPermission,
    page,
    rowsPerPage,
    onRowsPerPageChange,
    onPageChange
  }: TasksCoefficientsTablePropsType): ReactElement => (
    <div className='coeff-table'>
      <TableContainer component={Paper} className='coeff-table-container'>
        <Table aria-label='table'>
          <TableHead>
            <TableRow>
              {headerTableCellMain.map((item: string) => (
                <TableCell className='th-main' key={item}>
                  {item}
                </TableCell>
              ))}
              {headerTableCellTypes.map(({ taskType }) => (
                <TableCell className='th-types' key={taskType}>
                  {createFormattedString(taskType)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {taskCoefficientsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((group) => (
                <TasksCoefficientsRow
                  key={group.websiteGroupName}
                  group={group}
                  settingsPermission={settingsPermission}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        className='coeff-table__paginator'
        component='div'
        count={taskCoefficientsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  )
);

export default TasksCoefficientsTable;

TasksCoefficientsTable.displayName = 'TasksCoefficientsTable';
