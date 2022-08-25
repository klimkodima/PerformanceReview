import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { ROLE_NAME } from 'src/constants';
import { createFormattedLevel } from 'src/utils';
import { ErrorTooltip } from 'src/components/common';

type LevelSelectPropsType = {
  roleName: string;
  validation: string | null;
  onSelectChange: (label: string) => (e: SelectChangeEvent) => void;
};

const RoleSelect = memo(
  ({
    roleName,
    onSelectChange,
    validation
  }: LevelSelectPropsType): ReactElement => {
    const { t } = useTranslation();
    return (
      <>
        <label id='role-label'>{t('add_new_user_modal.role_label')}</label>
        <FormControl>
          <Select
            className={`add-new-user-select ${roleName ? '' : 'placeholder'}`}
            native
            id='role-select'
            data-testid='role-select'
            name='role-select'
            onChange={onSelectChange('roleName')}
            value={roleName}
          >
            {Object.values(ROLE_NAME)
              .concat([''])
              .map((role) => (
                <option
                  hidden={!role}
                  value={role}
                  key={role}
                  data-testid={`role-select-${role}`}
                >
                  {!role
                    ? t('add_new_user_modal.role_select_placeholder')
                    : createFormattedLevel(role)}
                </option>
              ))}
          </Select>
        </FormControl>
        {validation && <ErrorTooltip title={validation} />}
      </>
    );
  }
);

export default RoleSelect;

RoleSelect.displayName = 'RoleSelect';
