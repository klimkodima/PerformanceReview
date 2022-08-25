import Axios from 'axios';
import qs from 'qs';

import { setIsAuth } from 'src/store/Auth';

import { ErrorResponseType } from 'src/api';
import { StoreType } from 'src/store';

let store: StoreType;

export const injectStore = (injectStore: StoreType): void => {
  store = injectStore;
};

export const getApiUrl = (): string => 'http://localhost:3001/api/v2/';

const getAuthToken = (): string =>
  `Bearer ${store.getState().auth.accessToken}`;

function init(): void {
  Axios.defaults.baseURL = getApiUrl();
  Axios.defaults.headers.common.Accept = '*/*';
  Axios.defaults.paramsSerializer = (params) =>
    qs.stringify(params, { arrayFormat: 'repeat' });
}

function makeCall(method: string, url: string, data: any) {
  const request = {
    method,
    url,
    headers: {
      Authorization: getAuthToken()
    },
    params: {},
    data: {}
  };
  if (method === 'GET' || method === 'DELETE') {
    request.params = data;
  } else {
    request.data = data;
  }
  return new Promise((resolve, reject) => {
    Axios(request)
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        const error: ErrorResponseType = {
          message: reason.response.data
        };

        if (reason.response.status === 401) {
          store.dispatch(setIsAuth(false));
        }

        reject(error);
      });
  });
}

const getLink = (url: string): string =>
  `${Axios.defaults.baseURL || ''}${url}`;

interface IApi {
  init: () => void;
  get: (url: string, data: any) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
  put: (url: string, data: any) => Promise<any>;
  patch: (url: string, data: any) => Promise<any>;
  delete: (url: string, data: any) => Promise<any>;
  getFileTemplateUrl: (url: string) => string;
}

const api: IApi = {
  init,
  get: (url: string, data: any) => makeCall('GET', url, data),
  post: (url: string, data: any) => makeCall('POST', url, data),
  put: (url: string, data: any) => makeCall('PUT', url, data),
  patch: (url: string, data: any) => makeCall('PATCH', url, data),
  delete: (url: string, data: any) => makeCall('DELETE', url, data),
  getFileTemplateUrl: (url: string) => getLink(url)
};

export default api;
