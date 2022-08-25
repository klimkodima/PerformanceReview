import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { ErrorTooltip } from 'src/components/common';

import { TeamsDataResponseType } from 'src/store/Filter/types';

type LevelSelectPropsType = {
  teamName: string;
  teams: TeamsDataResponseType[];
  isShowTeamError: boolean;
  validation: string | null;
  onSelectChange: (label: string) => (e: SelectChangeEvent) => void;
};

const TeamSelect = memo(
  ({
    onSelectChange,
    teams,
    isShowTeamError,
    validation,
    teamName
  }: LevelSelectPropsType): ReactElement => {
    const { t } = useTranslation();
    return (
      <>
        <label id='team-label'>{t('add_new_user_modal.team_label')}</label>
        <FormControl>
          <Select
            className={`add-new-user-select ${teamName ? '' : 'placeholder'}`}
            native
            id='team-select'
            name='team-select'
            onChange={onSelectChange('teamName')}
            value={teamName}
          >
            {teams
              .concat([{ teamName: '', teamLeaderName: '' }])
              .map(({ teamName }) => (
                <option hidden={!teamName} value={teamName} key={teamName}>
                  {!teamName
                    ? t('add_new_user_modal.team_select_placeholder')
                    : teamName}
                </option>
              ))}
          </Select>
        </FormControl>
        {isShowTeamError && (
          <ErrorTooltip
            title={`${t('add_new_user_modal.team_error_tooltip_first_part')} ${
              teamName ? teamName : ''
            } ${t('add_new_user_modal.team_error_tooltip_second_part')}`}
          />
        )}
        {validation && <ErrorTooltip title={validation} />}
      </>
    );
  }
);

export default TeamSelect;

TeamSelect.displayName = 'TeamSelect';
