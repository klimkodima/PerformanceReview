import { RootStateType } from '../index';
import { CurrentUserType } from './types';

export const selectAuthIsAuth = (state: RootStateType): boolean =>
  state.auth.isAuth;

export const selectAuthError = (state: RootStateType): string | null =>
  state.auth.authError;

export const selectCurrentUser = (state: RootStateType): CurrentUserType =>
  state.auth.currentUser;
