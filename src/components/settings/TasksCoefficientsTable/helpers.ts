import { AUDIT_TYPE_MAPPER } from './constants';
import { WebsiteCoefficientType } from 'src/store/TasksCoeff';

export const getAuditType = (key: string): string => AUDIT_TYPE_MAPPER[key];

export const findWebsiteCoefficientsIndex = (
  website: WebsiteCoefficientType,
  taskTypeName: string
): number =>
  website.taskCoefficientDtos.findIndex(
    (item) => item.taskTypeName === taskTypeName && item.reauditCoefficient
  );
