import { ReactElement, memo } from 'react';

import { Modal } from 'src/components/common';
import { BUTTONS } from './constants';

import './PresetWorkingHoursModal.scss';

type PresetWorkingHoursModalPropsType = {
  onClose: () => void;
  modalNotification: string;
  onSave: () => void;
  isEmptyTable: boolean;
};

const PresetWorkingHoursModal = memo(
  ({
    onClose,
    modalNotification,
    onSave,
    isEmptyTable
  }: PresetWorkingHoursModalPropsType): ReactElement => {
    const { saveBtn, cancelBtn } = BUTTONS;

    return (
      <Modal
        isShowFooterButtons={true}
        isShowSaveButton={!isEmptyTable}
        onCloseClick={onClose}
        onSaveClick={onSave}
        closeButtonText={cancelBtn}
        saveButtonText={saveBtn}
        className='users-modal'
      >
        <h2>{modalNotification}</h2>
      </Modal>
    );
  }
);

export default PresetWorkingHoursModal;

PresetWorkingHoursModal.displayName = 'PresetWorkingHoursModal';
