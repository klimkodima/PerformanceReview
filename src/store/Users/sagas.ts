import {
  all,
  call,
  put,
  takeLatest,
  take,
  select,
  cancelled
} from 'redux-saga/effects';
import { END, EventChannel, eventChannel } from 'redux-saga';

import {
  activatePendingUser,
  getUsersList,
  updateAvatar,
  disabledUser,
  resetPassword,
  updateUser,
  getIsUserTableChanged,
  postUser
} from 'src/api';
import { handleError } from 'src/utils';
import {
  activateUser,
  createNewUser,
  fetchUsers,
  fetchUsersRefresh,
  setTimestamp,
  setIsCloseAddNewUserModal,
  setNewUserError,
  setUsers,
  stopSavingData,
  updateUserAvatar,
  resetUserPassword,
  updateUserData
} from './reducer';
import {
  selectIsUsersTableOpened,
  selectTimeOfLastUsersTableUpdate
} from './selectors';
import { fetchFilterData, setIsShowFilter } from '../Filter/reducer';

import { UpdatedPendingUsersType } from 'src/components/settings/Users/types';
import { AddNewUserFormValuesType, UserInfoType } from './types';
import { ActionType } from '../types';

function* fetchUsersList() {
  try {
    const usersList: UserInfoType[] = yield call(getUsersList, {});
    yield put(setTimestamp(new Date().toISOString().slice(0, -1)));
    yield put(setUsers(usersList));
    yield put(fetchFilterData());
  } catch (e) {
    yield put(setIsShowFilter(false));
    console.log(e);
  }
}

function* fetchUsersListWithRefresh() {
  let isUsersTableOpened: string = yield select(selectIsUsersTableOpened);

  let timeOfLastLocalUpdate: string = yield select(
    selectTimeOfLastUsersTableUpdate
  );

  const fetchStatus = () => {
    return eventChannel((emitter) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const interval = setInterval(async () => {
        try {
          if (isUsersTableOpened) {
            const isChanged: boolean = await getIsUserTableChanged({
              timeOfLastLocalUpdate
            });
            emitter(isChanged);
          } else {
            emitter(END);
          }
        } catch (e) {
          console.log(e);
          emitter(END);
        }
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    });
  };

  const channel: EventChannel<boolean> = yield call(fetchStatus);

  try {
    while (true) {
      timeOfLastLocalUpdate = yield select(selectTimeOfLastUsersTableUpdate);
      isUsersTableOpened = yield select(selectIsUsersTableOpened);
      if (!isUsersTableOpened) {
        channel.close();
      }
      const isChanged: boolean = yield take(channel);
      if (isChanged) {
        yield call(fetchUsersList);
      }
    }
  } finally {
    if (yield cancelled()) {
      if (channel) {
        channel.close();
      }
    }
  }
}

function* activatePendingUserWorker(
  action: ActionType<UpdatedPendingUsersType[]>
) {
  try {
    yield all(
      action.payload.map(({ id, thirdParty, role }) =>
        call(
          activatePendingUser,
          `${id}?thirdParty=${thirdParty.toString()}&role=${role}`
        )
      )
    );
    yield call(fetchUsersList);
  } catch (e) {
    console.log(e);
  }
}

function* updateUserAvatarWorker(action: ActionType<number>) {
  try {
    yield call(updateAvatar, action.payload);
  } catch (e) {
    console.log(e);
  }
}

function* resetUserPasswordWorker(action: ActionType<number>) {
  try {
    yield call(resetPassword, action.payload);
  } catch (e) {
    console.log(e);
  }
}

function* updateUserInfoWorker(action: ActionType<UserInfoType>) {
  try {
    yield call(updateUser, action.payload.id, {
      fullName: action.payload.fullName,
      enabled: action.payload.enabled,
      roleName: action.payload.roleName
    });
    yield call(fetchUsersList);
  } catch (e) {
    console.log(e);
  }
}

function* createNewUserWorker(action: ActionType<AddNewUserFormValuesType>) {
  try {
    yield call(postUser, action.payload);
    yield put(setNewUserError(null));
    yield put(setIsCloseAddNewUserModal(true));
  } catch (e) {
    yield put(setIsCloseAddNewUserModal(false));
    const { message } = handleError(e);
    console.log(message);

    Array.isArray(message)
      ? yield put(setNewUserError(message[0].errorMessage))
      : yield put(setNewUserError(message.errorMessage));
  }
}

function* stopSavingDataForUsersWorker(action: ActionType<UserInfoType[]>) {
  try {
    yield all(
      action.payload.map(({ id, enabled }) => enabled && call(disabledUser, id))
    );
    yield call(fetchUsersList);
  } catch (e) {
    console.log(e);
  }
}

export function* usersSaga(): Generator {
  yield takeLatest(fetchUsers.type, fetchUsersList);
  yield takeLatest(activateUser.type, activatePendingUserWorker);
  yield takeLatest(updateUserAvatar.type, updateUserAvatarWorker);
  yield takeLatest(resetUserPassword.type, resetUserPasswordWorker);
  yield takeLatest(updateUserData.type, updateUserInfoWorker);
  yield takeLatest(fetchUsersRefresh.type, fetchUsersListWithRefresh);
  yield takeLatest(createNewUser.type, createNewUserWorker);
  yield takeLatest(stopSavingData.type, stopSavingDataForUsersWorker);
}
