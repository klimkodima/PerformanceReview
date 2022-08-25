import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

import { CurrentUserType, LoginDataType } from './types';

type initialStateType = {
  accessToken: string;
  isAuth: boolean;
  authError: string | null;
  currentUser: CurrentUserType;
};

const initialState: initialStateType = {
  accessToken: '',
  isAuth: false,
  authError: null,
  currentUser: {
    enabled: false,
    id: 0,
    fullName: '',
    roleName: '',
    username: ''
  }
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state: initialStateType, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setIsAuth(state: initialStateType, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setAuthError(
      state: initialStateType,
      action: PayloadAction<string | null>
    ) {
      state.authError = action.payload;
    },
    setCurrentUser(
      state: initialStateType,
      action: PayloadAction<CurrentUserType>
    ) {
      state.currentUser = action.payload;
    }
  }
});

export const loginUser = createAction<LoginDataType>('auth/loginUser');

// Actions
export const { setAccessToken, setIsAuth, setAuthError, setCurrentUser } =
  slice.actions;

const AuthReducer = slice.reducer;
export default AuthReducer;
