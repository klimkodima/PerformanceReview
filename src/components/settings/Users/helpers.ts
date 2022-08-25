import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

import {
  AUDITOR_ROLE,
  PRESET_WORKING_HOURS_KEY,
  TEAM_LEAD_LEVEL,
  TEAM_LEAD_ROLE
} from './constants';

import { UserInfoType } from 'src/store/Users/types';
import { UpdatedPendingUsersType } from './types';

export const onChangePendingUsers = (
  e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>,
  idRow: number,
  rowsState: UpdatedPendingUsersType[],
  setRowsState: (arg: UpdatedPendingUsersType[]) => void
): void => {
  const { value, name } = e.target;

  const newRowsState = rowsState.map((row) => {
    if (row.id === idRow) {
      if (name === PRESET_WORKING_HOURS_KEY) {
        return {
          ...row,
          [name]: !row.thirdParty
        };
      }
      return {
        ...row,
        [name]: value
      };
    }
    return row;
  });

  setRowsState(newRowsState);
};

export const getSelectedUsersInfo = (
  selectedUsers: UserInfoType[],
  setUsersSelectedInfo: (value: UpdatedPendingUsersType[]) => void
): void => {
  const usersSelectedInfo: UpdatedPendingUsersType[] = [];
  selectedUsers.map(({ id, thirdParty, level }: UserInfoType) => {
    let role = AUDITOR_ROLE;
    if (level === TEAM_LEAD_LEVEL) role = TEAM_LEAD_ROLE;
    if (!level) role = '';

    usersSelectedInfo.push({
      id,
      thirdParty,
      role
    });
  });

  setUsersSelectedInfo(usersSelectedInfo);
};

export const getNamesString = (
  selectedUsers: UserInfoType[],
  isEnabled: boolean
): string => {
  let usersString = '';
  selectedUsers.map(({ fullName, enabled }: UserInfoType) => {
    const searchValue = isEnabled ? enabled : !enabled;
    return searchValue ? (usersString += `, ${fullName}`) : '';
  });
  return usersString.slice(1);
};
