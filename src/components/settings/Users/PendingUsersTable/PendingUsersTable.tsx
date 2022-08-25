import { ReactElement, useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button
} from '@mui/material';

import { createFormattedString } from 'src/utils';
import {
  activateUser,
  fetchUsers,
  selectUsers,
  stopSavingData
} from 'src/store/Users';
import { selectSettingsPermission } from 'src/store/App';
import { SETTINGS_PERMISSION } from 'src/constants';
import { PendingUsersModal } from './PendingUsersModal';
import { StopSavingDataModal } from './StopSavingDataModal';
import {
  ACTIVATE_BUTTON,
  HEADER_CELLS_PENDING_USERS,
  PENDING_ROW_CELLS,
  STOP_SAVING_DATA_BUTTON,
  TABLE_PENDING_TITLE
} from '../constants';
import { getSelectedUsersInfo } from '../helpers';
import { handleCheckboxClick } from '../../common/helpers';

import { UserInfoType } from 'src/store/Users/types';
import { UpdatedPendingUsersType } from '../types';

import './PendingUsersTable.scss';

const PendingUsersTable = (): ReactElement => {
  const settingsPermission = useSelector(selectSettingsPermission);
  const usersData = useSelector(selectUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const copyUsersData: UserInfoType[] = JSON.parse(JSON.stringify(usersData));
  const pendingUsers = copyUsersData.filter(({ pending }) => pending);

  const isEdit = settingsPermission === SETTINGS_PERMISSION.WRITE;
  const editClassName = isEdit ? 'settings-table__edit' : '';

  const [selected, setSelected] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserInfoType[]>([]);
  const isDisabled = isEmpty(selected);
  const [isDisabledStopSavingButton, setIsDisabledStopSavingButton] =
    useState<boolean>(true);

  useEffect(() => {
    const checkedUsers = pendingUsers.filter(({ id }) =>
      selected.includes(id.toString())
    );
    setSelectedUsers(checkedUsers);

    const saveDataUsers: boolean = isEmpty(
      checkedUsers.filter(({ enabled }) => enabled)
    );
    setIsDisabledStopSavingButton(saveDataUsers);
  }, [selected]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStopSavingModalOpen, setIsStopSavingModalOpen] =
    useState<boolean>(false);
  const handleModalOpenClick = (
    setIsModalOpen: (value: boolean) => void
  ): void => {
    setIsModalOpen(true);
  };
  const handleModalCloseClick = (
    setIsModalOpen: (value: boolean) => void
  ): void => {
    setIsModalOpen(false);
    setSelected([]);
  };

  useEffect(() => {
    getSelectedUsersInfo(selectedUsers, setUsersSelectedInfo);
  }, [selectedUsers]);

  const [usersSelectedInfo, setUsersSelectedInfo] = useState<
    UpdatedPendingUsersType[]
  >([]);

  const [isDisabledSendBtn, setIsDisabledSendBtn] = useState<boolean>(true);
  useEffect(() => {
    const withoutRole = usersSelectedInfo.filter(({ role }) => !role);
    isEmpty(withoutRole)
      ? setIsDisabledSendBtn(false)
      : setIsDisabledSendBtn(true);
  }, [usersSelectedInfo]);

  const activatePendingUsers = () => {
    dispatch(activateUser(usersSelectedInfo));
    handleModalCloseClick(setIsModalOpen);
  };

  const stopSavingDataForUsers = () => {
    dispatch(stopSavingData(selectedUsers));
    handleModalCloseClick(setIsStopSavingModalOpen);
  };

  useEffect(() => {
    if (isModalOpen || isStopSavingModalOpen)
      document.body.classList.add('scroll');
    return () => {
      document.body.classList.remove('scroll');
    };
  }, [isModalOpen, isStopSavingModalOpen]);

  return (
    <div className='pending_users'>
      <h2>{TABLE_PENDING_TITLE}</h2>
      <div className='settings-table'>
        <div className='settings-table__wrapper'>
          <TableContainer component={Paper} className={editClassName}>
            <Table aria-label='table'>
              <TableHead>
                <TableRow>
                  {isEdit && <TableCell />}
                  {HEADER_CELLS_PENDING_USERS.map((headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingUsers.map((user: UserInfoType) => (
                  <TableRow key={user.id}>
                    {isEdit && (
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(user.id.toString())}
                          className='edit__checkbox'
                          inputProps={{ 'aria-label': 'checkbox' }}
                          color='success'
                          onClick={() =>
                            handleCheckboxClick(
                              user.id.toString(),
                              selected,
                              setSelected
                            )
                          }
                        />
                      </TableCell>
                    )}
                    {PENDING_ROW_CELLS.map((cell: string) => (
                      <TableCell key={cell}>
                        {user[cell]
                          ? createFormattedString(user[cell] as string)
                          : '-'}
                      </TableCell>
                    ))}
                    <TableCell>{user.enabled ? 'yes' : 'no'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isEdit && (
            <>
              <Button
                variant='outlined'
                color='success'
                disabled={isDisabled}
                onClick={() => handleModalOpenClick(setIsModalOpen)}
              >
                {ACTIVATE_BUTTON}
              </Button>
              <Button
                variant='outlined'
                color='success'
                className='pending_users__stop-saving-button'
                disabled={isDisabledStopSavingButton}
                onClick={() => handleModalOpenClick(setIsStopSavingModalOpen)}
              >
                {STOP_SAVING_DATA_BUTTON}
              </Button>
            </>
          )}
        </div>
      </div>
      {isEdit && isModalOpen && (
        <PendingUsersModal
          selectedUsers={selectedUsers}
          usersSelectedInfo={usersSelectedInfo}
          setUsersSelectedInfo={setUsersSelectedInfo}
          onCloseClick={() => handleModalCloseClick(setIsModalOpen)}
          onSaveClick={activatePendingUsers}
          isDisabledSendBtn={isDisabledSendBtn}
        />
      )}
      {isEdit && isStopSavingModalOpen && (
        <StopSavingDataModal
          onCloseClick={() => handleModalCloseClick(setIsStopSavingModalOpen)}
          selectedUsers={selectedUsers}
          onSaveClick={stopSavingDataForUsers}
        />
      )}
    </div>
  );
};

export default PendingUsersTable;
