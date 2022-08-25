import { ReactElement, memo } from 'react';

import { isEmpty } from 'lodash';

import { Modal } from 'src/components/common';
import {
  NO_STOP_SAVING_SUBTITLE,
  NO_STOP_SAVING_TITLE,
  SAVE_STOP_SAVING_DATA_BUTTON,
  STOP_SAVING_TITLE
} from './constants';
import { CANCEL_BUTTON } from '../../constants';
import { getNamesString } from '../../helpers';

import { UserInfoType } from 'src/store/Users';

import './StopSavingDataModal.scss';

type StopSavingDataModalPropsType = {
  onCloseClick: () => void;
  onSaveClick: () => void;
  selectedUsers: UserInfoType[];
};

const StopSavingDataModal = memo(
  ({
    onCloseClick,
    onSaveClick,
    selectedUsers
  }: StopSavingDataModalPropsType): ReactElement => {
    const isShowNoSavingDataUsers: boolean = isEmpty(
      selectedUsers.filter(({ enabled }) => !enabled)
    );

    return (
      <Modal
        isShowFooterButtons={true}
        saveButtonText={SAVE_STOP_SAVING_DATA_BUTTON}
        closeButtonText={CANCEL_BUTTON}
        onCloseClick={onCloseClick}
        onSaveClick={onSaveClick}
      >
        <div className='stop-saving-modal'>
          <p>{STOP_SAVING_TITLE}</p>
          <p className='stop-saving-modal__subtitle'>
            {getNamesString(selectedUsers, true)}
          </p>
        </div>
        {!isShowNoSavingDataUsers && (
          <div className='stop-saving-modal'>
            {' '}
            <p>
              {NO_STOP_SAVING_TITLE}
              <span className='stop-saving-modal__subtitle'>
                {getNamesString(selectedUsers, false)}
              </span>
              {NO_STOP_SAVING_SUBTITLE}
            </p>
          </div>
        )}
      </Modal>
    );
  }
);

export default StopSavingDataModal;

StopSavingDataModal.displayName = 'StopSavingDataModal';
