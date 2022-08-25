import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, FC, ReactElement, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'src/components/common';
import {
  selectCurrentUserInfo,
  updateUserData,
  UserInfoType
} from 'src/store/Users';
import UserInfoModal from './UserInfoModal';

type UserInfoModalContainerPropsType = {
  onCloseModalClick: () => void;
  isEditable: boolean;
};

const UserInfoModalContainer: FC<UserInfoModalContainerPropsType> = ({
  onCloseModalClick,
  isEditable
}): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUserInfo = useSelector(selectCurrentUserInfo);

  const [currentUserModalInfo, setCurrentUserModalInfo] =
    useState<UserInfoType>(currentUserInfo);

  const isDisabledSaveButton =
    JSON.stringify(currentUserInfo) === JSON.stringify(currentUserModalInfo);

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { value, name } = e.target;
    if (name === 'switch') {
      setCurrentUserModalInfo({
        ...currentUserModalInfo,
        enabled: !currentUserModalInfo.enabled
      });
    } else setCurrentUserModalInfo({ ...currentUserModalInfo, [name]: value });
  };

  const updateUserInfo = () => {
    if (currentUserModalInfo.fullName) {
      dispatch(updateUserData(currentUserModalInfo));
      onCloseModalClick();
    }
  };

  return (
    <Modal
      isShowFooterButtons={isEditable}
      onCloseClick={onCloseModalClick}
      onSaveClick={updateUserInfo}
      className='user-info'
      saveButtonText={t('users_info_modal.save_button')}
      closeButtonText={t('users_info_modal.cancel_button')}
      isDisabledSaveButton={isDisabledSaveButton}
    >
      <UserInfoModal
        currentUserInfo={currentUserModalInfo}
        isEditable={isEditable}
        onCloseModalClick={onCloseModalClick}
        onChangeInput={onChangeInput}
      />
    </Modal>
  );
};

export default UserInfoModalContainer;
