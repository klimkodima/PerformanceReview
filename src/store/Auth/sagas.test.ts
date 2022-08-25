import { call, put } from 'redux-saga/effects';

import { postLogin } from 'src/api';
import { fetchCurrentUserWorker, loginSaga } from './sagas';
import { setAccessToken, setAuthError, setIsAuth } from './reducer';
import { reset, resetFilterUsersData } from '../Filter';

describe('Login sagas', () => {
  const payload = { username: '123', password: 'some' };
  const action = {
    type: 'auth/loginUser',
    payload
  };

  test('should test loginSaga', () => {
    const response = {
      type: '123',
      accessToken: 'accessToken'
    };

    const generator = loginSaga(action);

    expect(generator.next().value).toEqual(call(postLogin, payload));
    expect(generator.next(response).value).toEqual(
      put(setAccessToken(response.accessToken))
    );
    expect(generator.next().value).toEqual(put(setAuthError(null)));
    expect(generator.next().value).toEqual(put(setIsAuth(true)));
    expect(generator.next().value).toEqual(call(fetchCurrentUserWorker));
    expect(generator.next().value).toEqual(put(reset()));
    expect(generator.next().value).toEqual(put(resetFilterUsersData()));
  });

  test('should test error', () => {
    const error = { message: { errorMessage: 'error' } };

    const generator = loginSaga(action);
    generator.next();
    expect(generator.throw(error).value).toEqual(
      put(setAuthError('Invalid username or password.'))
    );
    expect(generator.next().value).toEqual(put(setIsAuth(false)));
  });

  test('should test bad request', () => {
    const error = { message: [{ errorMessage: 'empty username field' }] };

    const generator = loginSaga(action);
    generator.next();
    expect(generator.throw(error).value).toEqual(
      put(setAuthError('empty username field'))
    );
    expect(generator.next().value).toEqual(put(setIsAuth(false)));
  });
});
