export {
  getActivitiesPercentage,
  postLogin,
  getTaskTypesData,
  getTaskCoefficientsData,
  getWebsitesData,
  getContentAuditor,
  getHoursCorrespondence,
  postHoursCorrespondenceData,
  updateTaskCoefficients,
  getPresetWorkingHoursData,
  postPresetWorkingHoursData,
  putPresetWorkingHoursData,
  deletePresetWorkingHoursData,
  getTeamActivitiesPercentage,
  getBonusesData,
  updateSeniorityBonusesRow,
  createSeniorityBonusesRow,
  deleteSeniorityBonusesRow,
  getPerformanceStatistic,
  getAuditorsStatistics,
  getCriteria,
  getTeamComparisonData,
  getUsersList,
  activatePendingUser,
  disabledUser,
  getTeamsList,
  getCurrentUser,
  updateAvatar,
  resetPassword,
  updateUser,
  getAvailableWidgets,
  getIsUserTableChanged,
  postUser,
  postActivity,
} from './api';
export type { ResponseFCType, ErrorResponseType } from './types';
