import { t } from 'i18next';

import { TableHeaderCellsType } from './types';

export const HEADER_CELLS: TableHeaderCellsType[] = [
  { name: t('accuracy_by_property.property_label'), isShowIcon: false },
  { name: t('accuracy_by_property.score_label'), isShowIcon: true }
];
