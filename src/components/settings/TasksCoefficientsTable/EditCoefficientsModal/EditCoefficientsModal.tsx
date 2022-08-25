import { ChangeEvent, FormEvent, memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { createFormattedString } from 'src/utils';
import { WebsiteGroupsAccordion } from 'src/components/common';
import { GroupsList } from '../GroupsList';
import { getAuditType } from '../helpers';

import { CurrentEditDataType, WebsiteGroupType } from 'src/store/TasksCoeff';

import './EditCoefficientsModal.scss';

type EditCoefficientsModalPropsType = {
  isSaveButtonDisabled: boolean;
  isWebsiteGroupsOpen: boolean;
  coefficientInputError: string | null;
  coefficientValue: number | string;
  websiteGroupsData: WebsiteGroupType[];
  currentEditData: CurrentEditDataType;
  onClose: () => void;
  onWebsiteGroupsArrowClick: () => void;
  handleCoefficientErrors: () => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCoefficientChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const EditCoefficientsModal = memo(
  ({
    isSaveButtonDisabled,
    isWebsiteGroupsOpen,
    onClose,
    websiteGroupsData,
    currentEditData,
    onWebsiteGroupsArrowClick,
    onFormSubmit,
    onCoefficientChange,
    coefficientValue,
    coefficientInputError,
    handleCoefficientErrors
  }: EditCoefficientsModalPropsType): ReactElement => {
    const { t } = useTranslation();
    const coefficientInputStyle = `coefficient-input ${
      coefficientInputError !== null ? 'error' : ''
    }`;

    return (
      <form onSubmit={onFormSubmit} className='coefficients-modal-form'>
        <h2 className='coefficients-modal__title'>
          {t('tasks_coefficients.edit_coefficient_modal_title_text')}
        </h2>
        <div className='coefficients-modal__content'>
          <h3>
            {t('tasks_coefficients.task_type_text')}
            <span className='coefficients-modal__red'>
              {createFormattedString(currentEditData.taskType)}
            </span>
          </h3>
          <h3>
            {t('tasks_coefficients.audit_type_text')}
            <span className='coefficients-modal__red'>
              {getAuditType(currentEditData.auditType)}
            </span>
          </h3>

          <div className='coefficients-modal__coefficient'>
            <h3>{t('tasks_coefficients.coefficient_text')}</h3>
            <input
              className={coefficientInputStyle}
              name='coefficient'
              data-testid='coefficient-input'
              required
              step='any'
              type='number'
              min={0}
              value={coefficientValue}
              onChange={onCoefficientChange}
              onBlur={handleCoefficientErrors}
            />
          </div>

          <div className='coefficients-modal-website-groups'>
            <WebsiteGroupsAccordion
              expanded={isWebsiteGroupsOpen}
              summary={
                <span className='coefficients-modal-website-groups__label'>
                  {t('tasks_coefficients.website_groups_text')}
                </span>
              }
              expandIcon={
                <ArrowRightIcon
                  className='arrow-icon'
                  onClick={onWebsiteGroupsArrowClick}
                />
              }
            >
              <div className='coefficients-modal__groups'>
                {websiteGroupsData.map(({ websiteGroup, website }) => (
                  <GroupsList
                    key={websiteGroup}
                    websiteGroup={websiteGroup}
                    website={website}
                  />
                ))}
              </div>
            </WebsiteGroupsAccordion>
          </div>
        </div>
        <div className='coefficients-modal__buttons'>
          <Button
            className='button'
            type='submit'
            disabled={isSaveButtonDisabled}
          >
            {t('tasks_coefficients.save_button_text')}
          </Button>
          <Button
            className='button'
            data-testid='cancel-edit-modal-button'
            onClick={onClose}
          >
            {t('tasks_coefficients.cancel_button_text')}
          </Button>
        </div>
      </form>
    );
  }
);

export default EditCoefficientsModal;

EditCoefficientsModal.displayName = 'EditCoefficientsModal';
