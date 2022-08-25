import { t } from 'i18next';

export const HEADER_CELLS: string[] = [
  t('seniority_bonuses.header_cell_experience'),
  t('seniority_bonuses.header_cell_bonus')
];

export const CELL_NAMES = {
  experience: t('seniority_bonuses.experience'),
  bonus: t('seniority_bonuses.bonus')
};

export const ERRORS_TEXT = {
  wrongPattern: t('seniority_bonuses.wrong_pattern'),
  emptyField: t('seniority_bonuses.empty_field'),
  intervalError: t('seniority_bonuses.interval_error')
};

export const INFO_TOOLTIP = t('seniority_bonuses.info_tooltip_text');

export const EXPERIENCE_KEY = 'experience';
