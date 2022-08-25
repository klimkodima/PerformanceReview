import { ReactElement, useState, useEffect } from 'react';

import { t } from 'i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Button
} from '@mui/material';

import { createFormattedLevel } from 'src/utils';
import { selectSettingsPermission } from 'src/store/App';
import {
  fetchUsers,
  fetchUsersRefresh,
  resetCurrentUserInfo,
  selectUsers,
  setCurrentUserInfo,
  setIsUsersTableOpened
} from 'src/store/Users';
import { useDebounce } from 'src/components/hooks';
import { selectCurrentUser } from 'src/store/Auth';
import { ROLE_NAME, SETTINGS_PERMISSION } from 'src/constants';
import { descendingSort } from 'src/components/common/CommonTable/constants';
import { Search } from 'src/components/common';
import { UserInfoModal } from './UsersInfoModal';
import { AddNewUserModal } from './AddNewUserModal';
import {
  ENABLED_KEY,
  HeaderCellsUserType,
  HEADER_CELLS_USERS,
  Levels,
  LEVEL_KEY,
  LEVEL_LABEL,
  Roles,
  ROLE_LABEL,
  ROLE_NAME_KEY,
  TEAM_LABEL,
  USERS_ROW_CELLS
} from '../constants';

import { UserInfoType } from 'src/store/Users/types';

import './MainUsersTable.scss';

const MainUsersTable = (): ReactElement => {
  const settingsPermission = useSelector(selectSettingsPermission);
  const isEdit = settingsPermission === SETTINGS_PERMISSION.WRITE;
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsers);
  const { roleName } = useSelector(selectCurrentUser);

  const isAdmin = roleName === ROLE_NAME.ADMIN;

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(setIsUsersTableOpened(true));
    dispatch(fetchUsersRefresh());

    return () => {
      dispatch(setIsUsersTableOpened(false));
    };
  }, []);

  const [orderBy, setOrderBy] = useState<string>(t('users_table.team_label'));
  const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(false);
  const [isAddNewUserOpen, setIsAddNewUserOpen] = useState<boolean>(false);

  const handleRequestSort = (property: string): void => {
    setOrderBy(property);
  };

  const mainUsers = usersData.filter((user) => !user.pending);
  mainUsers.sort((a, b) => a.fullName.localeCompare(b.fullName));

  const sortData = (mainUsers: UserInfoType[], orderBy: string) => {
    if (orderBy === TEAM_LABEL) {
      const usersWithoutTeam = mainUsers.filter((user) => !user.teamId);
      const usersWithTeam = mainUsers.filter((user) => user.teamId);
      usersWithTeam.sort((a, b) => (a.teamId as number) - (b.teamId as number));

      return [...usersWithTeam, ...usersWithoutTeam].sort((a, b) =>
        a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1
      );
    }

    if (orderBy === ROLE_LABEL) {
      return mainUsers
        .sort((a, b) => Roles[a.roleName] - Roles[b.roleName])
        .sort((a, b) => (a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1));
    }

    if (orderBy === LEVEL_LABEL) {
      const usersWithoutLevel = mainUsers.filter((user) => !user.level);
      const usersWithLevel = mainUsers.filter((user) => user.level);
      usersWithLevel.sort(
        (a, b) => Levels[a.level as string] - Levels[b.level as string]
      );

      return [...usersWithLevel, ...usersWithoutLevel].sort((a, b) =>
        a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1
      );
    }
  };

  const sortedRows = sortData(mainUsers, orderBy);

  const getCellValue = (cell: string, value: string): string => {
    if (cell === ENABLED_KEY) return value ? 'Active' : 'Inactive';
    if (cell === ROLE_NAME_KEY || cell === LEVEL_KEY) {
      return value ? createFormattedLevel(value) : '-';
    }
    return value ? value : '-';
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchUsers, setSearchUsers] = useState(sortedRows);
  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  const handleSearchUsers = (): void => {
    const searchUsers = sortedRows?.filter((user: UserInfoType): boolean =>
      user.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );

    setSearchUsers(searchUsers);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearchUsers();
    } else {
      setSearchUsers(sortedRows);
    }
  }, [debouncedSearchTerm]);

  const handleSearchValue = (value: string): void => {
    setSearchValue(value);
  };

  const usersList = !searchValue ? sortedRows : searchUsers;

  const handleUserRowDoubleClick = (user: UserInfoType) => (): void => {
    dispatch(setCurrentUserInfo(user));
    setIsUserInfoOpen(true);
  };

  const handleCloseModalClick = (): void => {
    dispatch(resetCurrentUserInfo());
    setIsUserInfoOpen(false);
  };

  const handleAddNewUserButtonClick = (): void => {
    setIsAddNewUserOpen(true);
  };

  const handleCloseAddNewUserModalClick = (): void => {
    setIsAddNewUserOpen(false);
  };

  useEffect(() => {
    if (isUserInfoOpen || isAddNewUserOpen)
      document.body.classList.add('scroll');
    return () => {
      document.body.classList.remove('scroll');
    };
  }, [isUserInfoOpen, isAddNewUserOpen]);

  return (
    <div>
      <Search
        handleSearchValue={handleSearchValue}
        searchValue={searchValue}
        placeholder={t('search.placeholder')}
      />
      <div className='settings-table'>
        <div className='settings-table__wrapper users-table'>
          <TableContainer component={Paper} className='users-table__container'>
            <Table aria-label='table'>
              <TableHead>
                <TableRow>
                  {HEADER_CELLS_USERS.map(
                    ({ name, isShowIcon }: HeaderCellsUserType) => (
                      <TableCell key={name}>
                        {isShowIcon && (
                          <TableSortLabel
                            active={orderBy === name}
                            direction={descendingSort}
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
                {usersList?.map((user: UserInfoType) => {
                  const inactiveStyle = user.enabled ? '' : 'disabled-row';
                  return (
                    <TableRow
                      key={user.id}
                      className={inactiveStyle}
                      onDoubleClick={handleUserRowDoubleClick(user)}
                    >
                      {USERS_ROW_CELLS.map((cell: string) => (
                        <TableCell key={cell}>
                          {getCellValue(cell, user[cell] as string)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {isAdmin && (
        <Button
          id='add-user-button'
          onClick={handleAddNewUserButtonClick}
          variant='outlined'
        >
          {t('add_new_user_modal.save_button')}
        </Button>
      )}
      {isUserInfoOpen && (
        <UserInfoModal
          onCloseModalClick={handleCloseModalClick}
          isEditable={isEdit}
        />
      )}
      {isAddNewUserOpen && (
        <AddNewUserModal onCloseModalClick={handleCloseAddNewUserModalClick} />
      )}
    </div>
  );
};

export default MainUsersTable;
