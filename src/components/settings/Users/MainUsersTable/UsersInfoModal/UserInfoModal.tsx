import { ChangeEvent, MouseEvent, memo, ReactElement, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  IconButton,
  Checkbox,
  Select,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { createFormattedLevel } from 'src/utils';
import {
  resetUserPassword,
  updateUserAvatar,
  UserInfoType
} from 'src/store/Users';
import {
  ConfirmationModal,
  ErrorTooltip,
  InfoTooltip,
  NotificationText
} from 'src/components/common';
import { Switch } from 'src/components/common/Switch';
import defaultAvatar from 'src/assets/img/01_Auditor_icon.png';
import { UserInfoItem } from './UserInfoItem';
import { createWorksFromDate } from './helpers';
import {
  AUDITOR_ROLE,
  TEAM_LEAD_ROLE,
  MANAGER_ROLE,
  ADMIN_ROLE
} from '../../constants';

import './UserInfoModal.scss';

type UserInfoModalPropsType = {
  currentUserInfo: UserInfoType;
  onCloseModalClick: () => void;
  onChangeInput: (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void;
  isEditable: boolean;
};

const UserInfoModal = memo(
  ({
    currentUserInfo,
    onCloseModalClick,
    onChangeInput,
    isEditable
  }: UserInfoModalPropsType): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
      fullName,
      email,
      enabled,
      avatarUrl,
      thirdParty,
      roleName,
      jiraAccountId,
      level,
      teamName,
      worksFrom,
      id
    } = currentUserInfo;

    const [isDisabledResetButton, setIsDisabledResetButton] =
      useState<boolean>(false);
    const [isDisabledUploadButton, setIsDisabledUploadButton] =
      useState<boolean>(false);

    const isEditableResetButton = !isEditable ? true : isDisabledResetButton;
    const isEditableUploadButton = !isEditable ? true : isDisabledUploadButton;
    const notificationResetButton = isEditableResetButton
      ? t('users_info_modal.notification_reset_password_button')
      : '';
    const notificationUpdateButton = isDisabledUploadButton
      ? t('users_info_modal.notification_update_avatar_button')
      : '';
    const emptyUserNameError = !fullName
      ? t('users_info_modal.empty_user_name_error')
      : '';

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUploadAvatarInputOpen, setIsUploadAvatarInputOpen] =
      useState<boolean>(false);
    const onCloseNotificationClick = () => {
      setIsModalOpen(false);
    };

    const [isResetPasswordModal, setIsResetPasswordModal] =
      useState<boolean>(true);
    const onOpenNotificationClick = (e: MouseEvent<HTMLButtonElement>) => {
      if ((e.target as HTMLInputElement).name === 'reset-password') {
        setIsResetPasswordModal(true);
      } else {
        setIsResetPasswordModal(false);
      }

      setIsModalOpen(true);
    };

    const resetPassword = () => {
      setIsDisabledResetButton(true);
      dispatch(resetUserPassword(id));
      setIsModalOpen(false);
    };

    const uploadPhoto = () => {
      setIsDisabledUploadButton(true);
      dispatch(updateUserAvatar(id));
      setIsModalOpen(false);
    };

    const onOpenUpdateFotoInput = () => {
      setIsUploadAvatarInputOpen(true);
    };

    return (
      <>
        {!isEditable && (
          <IconButton
            className='user-info__exit-btn'
            onClick={onCloseModalClick}
          >
            <CloseIcon fontSize='large' />
          </IconButton>
        )}

        <div className='user-info__title'>
          <h5>{t('users_info_modal.title')}</h5>
        </div>
        <div className='user-info-wrapper'>
          <div className='user-info__column'>
            <UserInfoItem labelText={t('users_info_modal.user_name_label')}>
              {isEditable && (
                <div className='user-info__input-block'>
                  <input
                    className={!fullName ? 'error' : ''}
                    type='text'
                    value={fullName}
                    autoComplete='off'
                    name='fullName'
                    onChange={onChangeInput}
                  />
                  {!fullName && <ErrorTooltip title={emptyUserNameError} />}
                </div>
              )}
              {!isEditable && <p>{fullName}</p>}
            </UserInfoItem>
            <UserInfoItem
              labelText={t('users_info_modal.status_label')}
              className='user-info-wrapper__status'
            >
              <Switch
                checked={enabled}
                enabledText={t('users_info_modal.active_text')}
                disabledText={t('users_info_modal.inactive_text')}
                onChange={onChangeInput}
                isDisabled={!isEditable}
              />
            </UserInfoItem>
            <UserInfoItem labelText={t('users_info_modal.email_label')}>
              <p>{email}</p>
            </UserInfoItem>
            <UserInfoItem labelText={t('users_info_modal.password_label')}>
              <InfoTooltip
                title={notificationResetButton}
                icon={
                  <div>
                    <Button
                      className='user-info-btn'
                      variant='outlined'
                      disabled={isEditableResetButton}
                      onClick={onOpenNotificationClick}
                      name='reset-password'
                    >
                      {t('users_info_modal.password_btn_text')}
                    </Button>
                  </div>
                }
              />
            </UserInfoItem>
            <UserInfoItem labelText={t('users_info_modal.user_photo_label')}>
              <InfoTooltip
                title={notificationUpdateButton}
                icon={
                  <div>
                    <Button
                      className='user-info-btn'
                      variant='outlined'
                      disabled={isEditableUploadButton}
                      onClick={onOpenUpdateFotoInput}
                      name='update-photo'
                    >
                      {t('users_info_modal.user_photo_btn_text')}
                    </Button>
                    {isUploadAvatarInputOpen && (
                      <div className='user-info__input-block'>
                        <input
                          className={!fullName ? 'error' : ''}
                          type='file'
                          //value={fullName}
                          // autoComplete='off'
                          // name='fullName'
                          onChange={onChangeInput}
                        />
                      </div>
                    )}
                  </div>
                }
              />
            </UserInfoItem>

            <div className='user-info__avatar'>
              <img
                className={isDisabledUploadButton ? 'avatar-img' : ''}
                src={avatarUrl ? avatarUrl : defaultAvatar}
                alt='avatar'
              />
              {isDisabledUploadButton && (
                <p>{t('users_info_modal.request_title')}</p>
              )}
            </div>
          </div>
          <div>
            <UserInfoItem labelText={t('users_info_modal.jira_account_label')}>
              <p>{jiraAccountId}</p>
            </UserInfoItem>
            <UserInfoItem className='user-info-checkbox' labelText=''>
              <div className='user-info-checkbox__inner'>
                <Checkbox
                  id='user-info-checkbox'
                  checked={thirdParty}
                  disabled={true}
                />
                <label id='user-info-checkbox'>
                  {t('users_info_modal.preset_working_hours_text')}
                </label>
              </div>
            </UserInfoItem>
            <UserInfoItem labelText={t('users_info_modal.role_label')}>
              <FormControl fullWidth>
                <Select
                  className='user-info-select'
                  disabled={!isEditable}
                  native
                  defaultValue={roleName}
                  id='role-select'
                  name='roleName'
                  onChange={onChangeInput}
                >
                  <option value={AUDITOR_ROLE}>
                    {t('users_info_modal.option_role_auditor')}
                  </option>
                  <option value={TEAM_LEAD_ROLE}>
                    {t('users_info_modal.option_role_team_leader')}
                  </option>
                  <option value={MANAGER_ROLE}>
                    {t('users_info_modal.option_role_manager')}
                  </option>
                  <option value={ADMIN_ROLE}>
                    {t('users_info_modal.option_role_admin')}
                  </option>
                </Select>
              </FormControl>
            </UserInfoItem>
            {level && (
              <UserInfoItem labelText={t('users_info_modal.level_label')}>
                <p>{createFormattedLevel(level)}</p>
              </UserInfoItem>
            )}
            {teamName && (
              <UserInfoItem labelText={t('users_info_modal.team_label')}>
                <p>{teamName}</p>
              </UserInfoItem>
            )}
            <UserInfoItem labelText={t('users_info_modal.works_from_label')}>
              <p>{createWorksFromDate(worksFrom)}</p>
            </UserInfoItem>
          </div>
        </div>
        {isModalOpen && (
          <ConfirmationModal
            closeButtonText={t('users_info_modal.cancel_button')}
            saveButtonText={t('users_info_modal.agree_button')}
            className='user-info__notification-window'
            onCloseClick={onCloseNotificationClick}
            onSaveClick={isResetPasswordModal ? resetPassword : uploadPhoto}
            getNotificationText={
              <NotificationText
                title={
                  isResetPasswordModal
                    ? t('users_info_modal.modal_info_title_reset_password')
                    : t('users_info_modal.modal_info_title_update_photo')
                }
                subtitle={
                  isResetPasswordModal
                    ? t('users_info_modal.modal_info_subtitle_reset_password')
                    : t('users_info_modal.modal_info_subtitle_update_photo')
                }
                mainText={`${fullName}, ${email}`}
              />
            }
          />
        )}
      </>
    );
  }
);

export default UserInfoModal;

UserInfoModal.displayName = 'UserInfoModal';
