import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectSettingsPermission } from 'src/store/App';
import { selectAuthIsAuth } from 'src/store/Auth';
import {
  fetchTaskCoefficientsData,
  selectTaskCoefficientsData,
  selectTaskTypesData
} from 'src/store/TasksCoeff';
import TasksCoefficientsTable from './TasksCoefficientsTable';

const TasksCoefficientsTableContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isAuth = useSelector(selectAuthIsAuth);
  const settingsPermission = useSelector(selectSettingsPermission);
  const taskCoefficientsData = useSelector(selectTaskCoefficientsData);
  const headerTableCellTypes = useSelector(selectTaskTypesData);
  const headerTableCellMain = [
    t('settings.website_group'),
    '',
    t('settings.website'),
    t('settings.audit_type')
  ];

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handlePageChange = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchTaskCoefficientsData());
  }, [isAuth]);

  return (
    <TasksCoefficientsTable
      headerTableCellMain={headerTableCellMain}
      headerTableCellTypes={headerTableCellTypes}
      settingsPermission={settingsPermission}
      taskCoefficientsData={taskCoefficientsData}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default TasksCoefficientsTableContainer;
