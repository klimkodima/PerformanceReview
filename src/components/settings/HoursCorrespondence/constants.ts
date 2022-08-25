import { t } from 'i18next';
import 'src/i18n';

export const HEADER_CELLS: string[] = [
  t('hours_correspondence.status'),
  t('hours_correspondence.icon'),
  t('hours_correspondence.gap'),
  t('hours_correspondence.confirmation_rate'),
  t('hours_correspondence.tooltip_text')
];

export const ERROR_TEXTS: ErrorTextType = {
  emptyValueError: t('hours_correspondence.empty_value_error'),
  uniqueStatusError: t('hours_correspondence.unique_status_error'),
  confirmationRateError: t('hours_correspondence.confirmation_rate_error'),
  gapMinValueError: t('hours_correspondence.gap_min_value_error'),
  gapMaxValueError: t('hours_correspondence.gap_max_value_error'),
  gapCoverError: t('hours_correspondence.gap_cover_error'),
  gapPatternError: t('hours_correspondence.gap_pattern_error'),
  gapMinMaxValueError: t('hours_correspondence.gap_min_max_value_error')
};

type ErrorTextType = {
  [key: string]: string;
};
