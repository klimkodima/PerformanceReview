import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UpdatedPendingUsersType } from 'src/components/settings/Users/types';
import { AddNewUserFormValuesType, UserInfoType } from './types';

type initialStateType = {
  users: UserInfoType[];
  currentUserInfo: UserInfoType;
  timeOfLastLocalUpdate: string;
  isUsersTableOpened: boolean;
  addNewUserError: string | null;
  isCloseAddNewUserModal: boolean;
};

const initialCurrentUserInfo = {
  fullName: '',
  username: '',
  pending: false,
  roleName: '',
  email: '',
  enabled: false,
  id: 0,
  teamId: 0,
  teamName: '',
  level: '',
  avatarUrl: '',
  jiraAccountId: '',
  worksFrom: '',
  thirdParty: false
};

const initialState: initialStateType = {
  users: [],
  currentUserInfo: initialCurrentUserInfo,
  timeOfLastLocalUpdate: '',
  isUsersTableOpened: false,
  addNewUserError: null,
  isCloseAddNewUserModal: false
};

const slice = createSlice({
  name: 'UsersTable',
  initialState,
  reducers: {
    setUsers(state: initialStateType, action: PayloadAction<UserInfoType[]>) {
      state.users = action.payload;
    },
    setCurrentUserInfo(
      state: initialStateType,
      action: PayloadAction<UserInfoType>
    ) {
      state.currentUserInfo = action.payload;
    },
    resetCurrentUserInfo(state: initialStateType) {
      state.currentUserInfo = initialCurrentUserInfo;
    },
    setTimestamp(state: initialStateType, action: PayloadAction<string>) {
      state.timeOfLastLocalUpdate = action.payload;
    },
    setIsUsersTableOpened(
      state: initialStateType,
      action: PayloadAction<boolean>
    ) {
      state.isUsersTableOpened = action.payload;
    },
    setNewUserError(
      state: initialStateType,
      action: PayloadAction<string | null>
    ) {
      state.addNewUserError = action.payload;
    },
    setIsCloseAddNewUserModal(
      state: initialStateType,
      action: PayloadAction<boolean>
    ) {
      state.isCloseAddNewUserModal = action.payload;
    }
  }
});

export const fetchUsers = createAction('UsersTable/fetchUsers');
export const fetchUsersRefresh = createAction('UsersTable/fetchUsersRefresh');
export const activateUser = createAction<UpdatedPendingUsersType[]>(
  'UsersTable/activateUser'
);
export const updateUserAvatar = createAction<number>(
  'UsersTable/updateUserAvatar'
);
export const resetUserPassword = createAction<number>(
  'UsersTable/resetUserPassword'
);
export const updateUserData = createAction<UserInfoType>(
  'UsersTable/stopSavingData'
);
export const createNewUser = createAction<AddNewUserFormValuesType>(
  'UsersTable/createNewUser'
);
export const stopSavingData = createAction<UserInfoType[]>(
  'UsersTable/stopSavingData'
);

export const {
  setUsers,
  setCurrentUserInfo,
  resetCurrentUserInfo,
  setTimestamp,
  setIsUsersTableOpened,
  setNewUserError,
  setIsCloseAddNewUserModal
} = slice.actions;

const usersReducer = slice.reducer;
export default usersReducer;
