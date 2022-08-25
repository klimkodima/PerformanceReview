import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { LEVEL, ROLE_NAME } from 'src/constants';
import { createFormattedLevel } from 'src/utils';
import { ErrorTooltip } from 'src/components/common';

type LevelSelectPropsType = {
  level: string;
  roleName: string;
  validation: string | null;
  onSelectChange: (label: string) => (e: SelectChangeEvent) => void;
};

const LevelSelect = memo(
  ({
    level,
    validation,
    roleName,
    onSelectChange
  }: LevelSelectPropsType): ReactElement => {
    const { t } = useTranslation();
    return (
      <>
        <label id='add-new-user-level'>
          {t('add_new_user_modal.level_label')}
        </label>
        <FormControl>
          <Select
            className={`add-new-user-select ${level ? '' : 'placeholder'}`}
            native
            id='level-select'
            name='level-select'
            onChange={onSelectChange('level')}
            value={level}
          >
            {roleName === ROLE_NAME.TEAM_LEADER ? (
              <option value={LEVEL.TEAM_LEAD}>
                {createFormattedLevel(LEVEL.TEAM_LEAD)}
              </option>
            ) : (
              Object.values(LEVEL)
                .concat([''])
                .map((level) => (
                  <option
                    hidden={!level}
                    value={
                      roleName === ROLE_NAME.TEAM_LEADER
                        ? LEVEL.TEAM_LEAD
                        : level
                    }
                    key={level}
                  >
                    {!level
                      ? t('add_new_user_modal.level_select_placeholder')
                      : createFormattedLevel(level)}
                  </option>
                ))
            )}
          </Select>
        </FormControl>
        {validation && <ErrorTooltip title={validation} />}
      </>
    );
  }
);

export default LevelSelect;

LevelSelect.displayName = 'LevelSelect';
