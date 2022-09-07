import { api } from '../utils';

import {
  ResponseDeleteFCType,
  ResponseFCType,
  ResponseUpdateFCType
} from './types';

api.init();

export const getActivitiesPercentage: ResponseFCType = (request) =>
  api.get('widget/ActivitiesPercentage', request);

export const getContentAuditor: ResponseFCType = (request) =>
  api.get('widget/ContentAuditor', request);

export const getTeamActivitiesPercentage: ResponseFCType = (request) =>
  api.get('widget/TeamActivitiesPercentage', request);

export const getAuditorsStatistics: ResponseFCType = (request) =>
  api.get('widget/AuditorsStatistic', request);

export const getTeamComparisonData: ResponseFCType = (request) =>
  api.get('widget/TeamComparison', request);

export const getCriteria: ResponseFCType = (request) =>
  api.get('widget/CriteriaWidget', request);

export const getAvailableWidgets: ResponseFCType = (request) =>
  api.get('widget', request);

export const getTaskCoefficientsData: ResponseFCType = (request) =>
  api.get('tasks/coefficient', request);

export const updateTaskCoefficients: ResponseFCType = (data) =>
  api.post('tasks/coefficient', data);

export const getTaskTypesData: ResponseFCType = (request) =>
  api.get('tasks', request);

export const getWebsitesData: ResponseFCType = (request) =>
  api.get('website', request);

export const getHoursCorrespondence: ResponseFCType = (request) =>
  api.get('status_gaps', request);

export const postHoursCorrespondenceData: ResponseFCType = (data) =>
  api.post('status_gaps', data);

export const getPresetWorkingHoursData: ResponseFCType = (request) =>
  api.get('worklogtemplate', request);

export const postPresetWorkingHoursData: ResponseFCType = (data) =>
  api.post('worklogtemplate', data);

export const putPresetWorkingHoursData: ResponseFCType = (data) =>
  api.put('worklogtemplate', data);

export const deletePresetWorkingHoursData: ResponseFCType = (data: string) =>
  api.delete(`worklogtemplate/${data}`, {});

export const getBonusesData: ResponseFCType = (data) => api.get('bonus', data);

export const updateSeniorityBonusesRow: ResponseFCType = (data) =>
  api.put('bonus', data);

export const createSeniorityBonusesRow: ResponseFCType = (data) =>
  api.post('bonus', data);

export const deleteSeniorityBonusesRow: ResponseDeleteFCType = (id: string) =>
  api.delete(`bonus/${id}`, {});

export const getUsersList: ResponseFCType = (request) =>
  api.get('user', request);

export const postUser: ResponseFCType = (data) => api.post('user', data);

export const activatePendingUser: ResponseFCType = (data: string) =>
  api.patch(`user/activate/${data}`, {});

export const disabledUser: ResponseFCType = (id: string) =>
  api.patch(`user/disable/${id}`, {});

export const getCurrentUser: ResponseFCType = (request) =>
  api.get('user/current', request);

export const updateAvatar: ResponseFCType = (id: number) =>
  api.patch(`user/updateavatar/${id}`, {});

export const resetPassword: ResponseFCType = (id: number) =>
  api.patch(`user/resetpassword/${id}`, {});

export const updateUser: ResponseUpdateFCType = (id: number, data) =>
  api.put(`user/${id}`, data);

export const getIsUserTableChanged: ResponseFCType = (request) =>
  api.get('user/isChanged', request);

export const getTeamsList: ResponseFCType = (request) =>
  api.get('team', request);

export const createTeam: ResponseFCType = (data) => api.post('team', data);

export const updateTeam: ResponseUpdateFCType = (id: number, data) =>
  api.patch(`team/${id}`, data);

export const deleteTeam: ResponseDeleteFCType = (id: string) =>
  api.delete(`team/${id}`, {});

export const postLogin: ResponseFCType = (data) => api.post('auth/login', data);

export const getPerformanceStatistic: ResponseFCType = (request) =>
  api.get('widget/PerformanceStatistics', request);
export const postActivity: ResponseFCType = (data) =>
  api.post('activity', data);
