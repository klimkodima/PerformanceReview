import { t } from 'i18next';
import 'src/i18n';

export const getValueType = (titleName: string, value: number): string => {
  if (titleName === t('criteria_widgets.averagePerformance')) {
    return value === 1
      ? t('criteria_widgets.task_h')
      : t('criteria_widgets.tasks_h');
  } else if (titleName === t('criteria_widgets.supportAndAuditsTime')) {
    return 'h';
  } else return '%';
};
