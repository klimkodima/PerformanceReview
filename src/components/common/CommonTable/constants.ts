import { t } from 'i18next';

import { Order } from './types';

export const ascendingSort: Order = t('common_table.ascending_sort');
export const descendingSort: Order = t('common_table.descending_sort');
export const teamLeadBonus = t('common_table.team_lead_bonus');

export const HEAD_CELL_NAMES = {
  nameColumn: t('common_table.name_column'),
  pointsColumn: t('common_table.points_column'),
  performanceColumn: t('common_table.performance_column'),
  validityColumn: t('common_table.validity_column'),
  supportColumn: t('common_table.support_column'),
  correspondenceColumn: t('common_table.correspondence_column')
};

export enum CELL_COLOR_STYLE {
  minValueStyle = 'comparison-table-cell min-value-color',
  maxValueStyle = 'comparison-table-cell max-value-color',
  commonValueStyle = 'comparison-table-cell'
}

export const VALUE_TYPES = {
  task: t('common_table.task'),
  tasks: t('common_table.tasks'),
  percent: t('common_table.percent'),
  dash: t('common_table.dash'),
  hours: t('common_table.hours')
};
