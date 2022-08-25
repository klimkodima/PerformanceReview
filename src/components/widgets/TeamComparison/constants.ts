import { t } from 'i18next';

import { HeadCellType } from '../../common/CommonTable/types';

export const headerName = t('team_comparison.header_name');

export const headCells: HeadCellType[] = [
  {
    id: t('common_table.name_column'),
    label: t('team_comparison.team_label')
  },
  {
    id: t('common_table.points_column'),
    label: t('team_comparison.points_label')
  },
  {
    id: t('common_table.performance_column'),
    label: t('team_comparison.performance_label')
  },
  {
    id: t('common_table.validity_column'),
    label: t('team_comparison.validity_label')
  },
  {
    id: t('common_table.correspondence_column'),
    label: t('team_comparison.correspondence_label')
  }
];

export const PLACEHOLDER_TEXT = t('team_comparison.placeholder_text');
