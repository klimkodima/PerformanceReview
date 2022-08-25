import { FC, Fragment, useState, ReactElement } from 'react';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { TableRow, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { SETTINGS_PERMISSION } from 'src/constants';
import {
  CurrentEditDataType,
  resetCurrentEditData,
  resetEditFormValues,
  setCurrentEditData,
  setFormTaskName,
  WebsiteCoefficientType
} from 'src/store/TasksCoeff';
import { EditCoefficientsModal } from './EditCoefficientsModal';

import { SettingsPermissionType } from 'src/store/App';
import { TaskCoefficientsDataType } from 'src/store/TasksCoeff/types';

type CoeffRowPropsType = {
  group: TaskCoefficientsDataType;
  settingsPermission: SettingsPermissionType;
};

const TasksCoefficientsRow: FC<CoeffRowPropsType> = ({
  group,
  settingsPermission
}): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { taskCoefficientDtos, websiteCoefficientDtos, websiteGroupName } =
    group;
  const isWebsite = !isEmpty(websiteCoefficientDtos);
  const isShowBtn: boolean = settingsPermission === SETTINGS_PERMISSION.WRITE;
  const rowSpanValue =
    !isEmpty(websiteCoefficientDtos) && isOpen
      ? websiteCoefficientDtos.length * 2 + 2
      : 2;

  const handleEditClick = (currentEditData: CurrentEditDataType) => {
    setIsModalOpen(true);
    dispatch(setCurrentEditData(currentEditData));
    dispatch(setFormTaskName(currentEditData.taskType));
  };
  const handleModalCloseClick = () => {
    setIsModalOpen(false);
    dispatch(resetCurrentEditData());
    dispatch(resetEditFormValues());
  };

  return (
    <>
      <TableRow>
        <td rowSpan={rowSpanValue} className='td-group'>
          {websiteGroupName}
        </td>
        <td rowSpan={rowSpanValue} className='td-icon'>
          {isWebsite && (
            <IconButton
              aria-label='expand row'
              size='large'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </td>
        <td className='td-group' rowSpan={2}>
          {t('tasks_coefficients.group_coefficients_title')}
        </td>
        <td>{t('tasks_coefficients.initial_audit_type')}</td>
        {taskCoefficientDtos.map(({ taskTypeName, initialCoefficient }) => (
          <td key={taskTypeName} className='td-btn-block'>
            {initialCoefficient}
            {isShowBtn && (
              <IconButton
                aria-label='edit'
                data-testid='edit-handle-initial-group'
                size='large'
                onClick={() =>
                  handleEditClick({
                    taskType: taskTypeName,
                    auditType: 'initial',
                    websiteCoefficient: null,
                    groupCoefficient: initialCoefficient,
                    websiteGroup: websiteGroupName
                  })
                }
              >
                <CreateIcon />
              </IconButton>
            )}
          </td>
        ))}
      </TableRow>
      <TableRow>
        <td>{t('tasks_coefficients.reaudit_audit_type')}</td>
        {taskCoefficientDtos.map(({ taskTypeName, reauditCoefficient }) => (
          <td key={taskTypeName} className='td-btn-block'>
            {reauditCoefficient}
            {isShowBtn && (
              <IconButton
                aria-label='edit'
                data-testid='edit-handle-reaudit-group'
                size='large'
                onClick={() =>
                  handleEditClick({
                    taskType: taskTypeName,
                    auditType: 'reaudit',
                    websiteCoefficient: null,
                    groupCoefficient: reauditCoefficient,
                    websiteGroup: websiteGroupName
                  })
                }
              >
                <CreateIcon />
              </IconButton>
            )}
          </td>
        ))}
      </TableRow>
      {isWebsite &&
        isOpen &&
        websiteCoefficientDtos.map((website: WebsiteCoefficientType) => (
          <Fragment key={website.websiteName}>
            <TableRow>
              <td className='td-group' rowSpan={2}>
                {website.websiteName}
              </td>
              <td>{t('tasks_coefficients.initial_audit_type')}</td>
              {taskCoefficientDtos.map(
                ({ taskTypeName, initialCoefficient }) => {
                  const websiteCoefficientsIndex =
                    website.taskCoefficientDtos.findIndex(
                      (item) =>
                        item.taskTypeName === taskTypeName &&
                        item.initialCoefficient
                    );

                  return (
                    <td
                      key={taskTypeName}
                      className='td-btn-block'
                      data-testid={`initial ${taskTypeName}`}
                    >
                      {websiteCoefficientsIndex >= 0
                        ? website.taskCoefficientDtos[websiteCoefficientsIndex]
                            .initialCoefficient
                        : initialCoefficient}
                      {isShowBtn && (
                        <IconButton
                          aria-label='edit'
                          data-testid='edit-handle-initial'
                          size='large'
                          onClick={() =>
                            handleEditClick({
                              taskType: taskTypeName,
                              auditType: 'initial',
                              websiteCoefficient:
                                website.taskCoefficientDtos[
                                  websiteCoefficientsIndex
                                ] &&
                                website.taskCoefficientDtos[
                                  websiteCoefficientsIndex
                                ].initialCoefficient,
                              groupCoefficient: initialCoefficient,
                              websiteName: website.websiteName,
                              websiteGroup: websiteGroupName
                            })
                          }
                        >
                          <CreateIcon />
                        </IconButton>
                      )}
                    </td>
                  );
                }
              )}
            </TableRow>
            <TableRow>
              <td>{t('tasks_coefficients.reaudit_audit_type')}</td>
              {taskCoefficientDtos.map(
                ({ taskTypeName, reauditCoefficient }) => {
                  const websiteCoefficientsIndex =
                    website.taskCoefficientDtos.findIndex(
                      (item) =>
                        item.taskTypeName === taskTypeName &&
                        item.reauditCoefficient
                    );

                  return (
                    <td
                      key={taskTypeName}
                      className='td-btn-block'
                      data-testid={`reaudit ${taskTypeName}`}
                    >
                      {websiteCoefficientsIndex >= 0
                        ? website.taskCoefficientDtos[websiteCoefficientsIndex]
                            .reauditCoefficient
                        : reauditCoefficient}
                      {isShowBtn && (
                        <IconButton
                          aria-label='edit'
                          data-testid='edit-handle-reaudit'
                          size='large'
                          onClick={() =>
                            handleEditClick({
                              taskType: taskTypeName,
                              auditType: 'reaudit',
                              websiteCoefficient:
                                website.taskCoefficientDtos[
                                  websiteCoefficientsIndex
                                ] &&
                                website.taskCoefficientDtos[
                                  websiteCoefficientsIndex
                                ].reauditCoefficient,
                              groupCoefficient: reauditCoefficient,
                              websiteName: website.websiteName,
                              websiteGroup: websiteGroupName
                            })
                          }
                        >
                          <CreateIcon />
                        </IconButton>
                      )}
                    </td>
                  );
                }
              )}
            </TableRow>
          </Fragment>
        ))}
      {isModalOpen && <EditCoefficientsModal onClose={handleModalCloseClick} />}
    </>
  );
};

export default TasksCoefficientsRow;
