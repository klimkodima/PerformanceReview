import { ChangeEventHandler, memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import { Checkbox, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { ErrorTooltip, InfoTooltip } from 'src/components/common';
import LevelSelect from './LevelSelect';
import TeamSelect from './TeamSelect';
import RoleSelect from './RoleSelect';

import { AddNewUserFormValuesType } from 'src/store/Users';
import { AddNewUserValidationType, TeamsDataType } from './types';

import './AddNewUserModal.scss';

type AddNewUserModalPropsType = {
  onSelectChange: (label: string) => (e: SelectChangeEvent) => void;
  onInputChange: (
    label: string
  ) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  formValues: AddNewUserFormValuesType;
  teams: TeamsDataType[];
  isShowTeamError: boolean;
  validation: AddNewUserValidationType;
  isShowLevelAndTeamInputs: boolean;
};

const AddNewUserModal = memo(
  ({
    onSelectChange,
    onInputChange,
    formValues,
    teams,
    isShowTeamError,
    validation,
    isShowLevelAndTeamInputs
  }: AddNewUserModalPropsType): ReactElement => {
    const { t } = useTranslation();
    return (
      <div className='add-new-user'>
        <div className='add-new-user__title'>
          <h5>{t('add_new_user_modal.title')}</h5>
        </div>
        <div className='add-new-user-wrapper'>
          <div className='add-new-user__item' data-testid='add-new-user__item'>
            <label id='new-user-username'>
              {t('add_new_user_modal.username_label')}
            </label>
            <TextField
              placeholder={t('add_new_user_modal.username_placeholder')}
              className='add-new-user-input'
              id='new-user-username'
              value={formValues.username}
              onChange={onInputChange('username')}
            />
            {validation.username && (
              <ErrorTooltip title={validation.username} />
            )}
          </div>
          <div className='add-new-user__item' data-testid='add-new-user__item'>
            <label id='email-login'>
              {t('add_new_user_modal.email_label')}
            </label>
            <TextField
              placeholder={t('add_new_user_modal.email_placeholder')}
              className='add-new-user-input'
              id='email-login'
              value={formValues.email}
              onChange={onInputChange('email')}
            />
            {validation.email && <ErrorTooltip title={validation.email} />}
          </div>
          <div className='add-new-user__item' data-testid='add-new-user__item'>
            <label id='new-user-password'>
              {t('add_new_user_modal.password_label')}
            </label>
            <TextField
              type='password'
              placeholder={t('add_new_user_modal.password_placeholder')}
              className='add-new-user-input'
              id='new-user-password'
              value={formValues.password}
              onChange={onInputChange('password')}
            />
            <InfoTooltip
              title={t('add_new_user_modal.password_info')}
              icon={
                <InfoIcon
                  className='info-icon'
                  color='primary'
                  data-testid='info-icon-test'
                />
              }
            />
            {validation.password && (
              <ErrorTooltip title={validation.password} />
            )}
          </div>
          <div className='add-new-user__item' data-testid='add-new-user__item'>
            <RoleSelect
              roleName={formValues.roleName}
              validation={validation.roleName}
              onSelectChange={onSelectChange}
            />
            <div className='preset-working-hours-checkbox'>
              <Checkbox
                id='preset-working-hours-label'
                value={formValues.thirdParty}
                onChange={onInputChange('thirdParty')}
              />
              <label id='preset-working-hours-label'>
                {t('add_new_user_modal.preset_working_hours_label')}
              </label>
              <InfoTooltip
                title={t('add_new_user_modal.preset_working_hours_info')}
                icon={
                  <InfoIcon
                    className='info-icon'
                    color='primary'
                    data-testid='info-icon-test'
                  />
                }
              />
            </div>
          </div>
          {isShowLevelAndTeamInputs && (
            <div>
              <div
                className='add-new-user__item'
                data-testid='add-new-user__item'
              >
                <TeamSelect
                  teamName={formValues.teamName ? formValues.teamName : ''}
                  teams={teams}
                  isShowTeamError={isShowTeamError}
                  validation={validation.teamName}
                  onSelectChange={onSelectChange}
                />
              </div>
              <div
                className='add-new-user__item'
                data-testid='add-new-user__item'
              >
                <LevelSelect
                  level={formValues.level ? formValues.level : ''}
                  roleName={formValues.roleName}
                  validation={validation.level}
                  onSelectChange={onSelectChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default AddNewUserModal;

AddNewUserModal.displayName = 'AddNewUserModal';
