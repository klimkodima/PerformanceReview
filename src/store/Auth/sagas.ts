import {
  takeLatest,
  put,
  call,
  CallEffect,
  PutEffect
} from 'redux-saga/effects';

import { handleError } from 'src/utils';
import { getCurrentUser, postLogin } from 'src/api';
import {
  setAccessToken,
  loginUser,
  setAuthError,
  setIsAuth,
  setCurrentUser
} from './reducer';
import { reset, resetFilterUsersData } from '../Filter';

import { CurrentUserType, LoginDataType, LoginResponseType } from './types';
import { ActionType } from '../types';

export function* loginSaga(
  action: ActionType<LoginDataType>
): Generator<
  | CallEffect<LoginResponseType>
  | PutEffect<ActionType<string | null>>
  | PutEffect<ActionType<boolean>>
  | PutEffect<ActionType>
  | CallEffect<void>,
  void,
  LoginResponseType
> {
  try {
    const response: LoginResponseType = yield call(postLogin, action.payload);

    yield put(setAccessToken(response.accessToken));
    yield put(setAuthError(null));
    yield put(setIsAuth(true));
    yield call(fetchCurrentUserWorker);
    yield put(reset());
    yield put(resetFilterUsersData());
  } catch (e) {
    const { message } = handleError(e);

    Array.isArray(message)
      ? yield put(setAuthError(message[0].errorMessage))
      : yield put(setAuthError('Invalid username or password.'));
    yield put(setIsAuth(false));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* fetchCurrentUserWorker() {
  try {
    const { id, level, fullName, roleName, teamId, teamName }: CurrentUserType =
      yield call(getCurrentUser, {});

    yield put(
      setCurrentUser({
        id,
        level,
        fullName,
        roleName,
        teamName: teamName ? teamName : '',
        teamId: teamId ? teamId : 0
      })
    );
  } catch (e) {
    console.log(e);
  }
}

export function* AuthSaga(): Generator {
  yield takeLatest(loginUser.type, loginSaga);
}
