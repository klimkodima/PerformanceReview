import { t } from 'i18next';

import { HeadCellType } from '../../common/CommonTable/types';

export const headerName = t('auditors_statistics.header_name');

export const headCells: HeadCellType[] = [
  {
    id: t('common_table.name_column'),
    label: t('auditors_statistics.auditor_label')
  },
  {
    id: t('common_table.points_column'),
    label: t('auditors_statistics.points_label')
  },
  {
    id: t('common_table.performance_column'),
    label: t('auditors_statistics.performance_label')
  },
  {
    id: t('common_table.validity_column'),
    label: t('auditors_statistics.validity_label')
  },
  {
    id: t('common_table.support_column'),
    label: t('auditors_statistics.support_label')
  },
  {
    id: t('common_table.correspondence_column'),
    label: t('auditors_statistics.correspondence_label')
  }
];
