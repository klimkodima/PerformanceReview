import { t } from 'i18next';

export const AUDIT_TITLE: string = t('main.auditors_level');
export const TEAM_LEADER_TITLE: string = t('main.team_leads_level');
export const MANAGER_TITLE: string = t('main.managers_level');

export const ROLE_NAME = {
  ADMIN: 'ADMIN',
  TEAM_LEADER: 'TEAM_LEADER',
  AUDITOR: 'AUDITOR',
  MANAGER: 'MANAGER'
};

export enum SETTINGS_PERMISSION {
  READ = 'READ',
  WRITE = 'WRITE',
  NONE = 'NONE'
}

export const WIDGETS = {
  CONTENT_AUDITOR: 'ContentAuditor',
  ACTIVITIES_PERCENTAGE: 'ActivitiesPercentage',
  CRITERIA_WIDGET: 'CriteriaWidget',
  PERFORMANCE_STATISTICS: 'PerformanceStatistics',
  TEAM_COMPARISON: 'TeamComparison',
  AUDITORS_STATISTIC: 'AuditorsStatistic',
  TEAM_ACTIVITIES_PERCENTAGE: 'TeamActivitiesPercentage'
};

export const LEVEL = {
  TRAINEE: 'TRAINEE',
  JUNIOR: 'JUNIOR',
  MIDDLE: 'MIDDLE',
  SENIOR: 'SENIOR',
  TEAM_LEAD: 'TEAM_LEAD'
};
