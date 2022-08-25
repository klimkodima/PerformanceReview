import { t } from 'i18next';

import { ConstantsTextType } from '../types';

export const HEADER_CELLS: string[] = [
  t('preset_working_hours_table.header_cell_label'),
  t('preset_working_hours_table.header_cell_hours')
];

export const ERROR_TEXTS: ConstantsTextType = {
  emptyValueError: t('preset_working_hours_table.empty_value_error'),
  uniqueLabelError: t('preset_working_hours_table.unique_label_error'),
  hoursPatternError: t('preset_working_hours_table.hours_pattern_error'),
  hoursValueError: t('preset_working_hours_table.hours_value_error')
};

export const MODAL_ERROR_TEXTS: ConstantsTextType = {
  exceedsValueNotification: t(
    'preset_working_hours_table.modal_notification_exceeds'
  ),
  lessValueNotification: t(
    'preset_working_hours_table.modal_notification_less'
  ),
  emptyValueNotification: t(
    'preset_working_hours_table.modal_notification_empty_table'
  )
};

export const OPTIONS_TEXTS: ConstantsTextType = {
  optionValue1: t('preset_working_hours_table.option_value_1'),
  optionValue2: t('preset_working_hours_table.option_value_2'),
  optionValue3: t('preset_working_hours_table.option_value_3')
};

export const HOURS_PER_DAY = 8;
