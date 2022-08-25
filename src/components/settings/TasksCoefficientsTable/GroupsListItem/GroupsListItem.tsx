import { ChangeEvent, memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { FormControlLabel } from '@mui/material';

import { ErrorTooltip } from 'src/components/common';
import { CustomCheckbox } from '../WebsiteCheckbox';

import './GroupsListItem.scss';

type GroupListItemPropsType = {
  label: string;
  checked: boolean;
  hasIndividualCoefficient: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    currentWebsiteName: string
  ) => void;
};

const GroupsListItem = memo(
  ({
    label,
    onChange,
    checked,
    hasIndividualCoefficient
  }: GroupListItemPropsType): ReactElement => {
    const { t } = useTranslation();
    return (
      <FormControlLabel
        className='group-list-item'
        label={
          <span
            className='group-list-item-label'
            data-testid='group-list-item-label'
          >
            {label}
            {hasIndividualCoefficient && (
              <ErrorTooltip
                title={t('tasks_coefficients.individual_mark_tooltip_text')}
              />
            )}
          </span>
        }
        control={
          <CustomCheckbox
            checked={checked}
            onChange={(event) => onChange(event, label)}
          />
        }
      />
    );
  }
);

export default GroupsListItem;

GroupsListItem.displayName = 'GroupsListItem';
