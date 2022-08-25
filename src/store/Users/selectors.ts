import { RootStateType } from '../index';

import { UserInfoType } from './types';

export const selectUsers = (state: RootStateType): UserInfoType[] =>
  state.users.users;

export const selectCurrentUserInfo = (state: RootStateType): UserInfoType =>
  state.users.currentUserInfo;

export const selectTimeOfLastUsersTableUpdate = (
  state: RootStateType
): string => state.users.timeOfLastLocalUpdate;

export const selectIsUsersTableOpened = (state: RootStateType): boolean =>
  state.users.isUsersTableOpened;

export const selectAddNewUserError = (state: RootStateType): string | null =>
  state.users.addNewUserError;

export const selectIsCloseAddNewUserModal = (state: RootStateType): boolean =>
  state.users.isCloseAddNewUserModal;
