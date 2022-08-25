import { ReactElement, memo } from 'react';

import { Modal } from 'src/components/common';

type ConfirmationModalPropsType = {
  closeButtonText: string;
  saveButtonText: string;
  className: string;
  onCloseClick: () => void;
  onSaveClick: () => void;
  getNotificationText: ReactElement;
};

const ConfirmationModal = memo(
  ({
    closeButtonText,
    saveButtonText,
    className,
    onCloseClick,
    onSaveClick,
    getNotificationText
  }: ConfirmationModalPropsType): ReactElement => (
    <Modal
      isShowFooterButtons={true}
      onCloseClick={onCloseClick}
      onSaveClick={onSaveClick}
      className={className}
      closeButtonText={closeButtonText}
      saveButtonText={saveButtonText}
    >
      {getNotificationText}
    </Modal>
  )
);

export default ConfirmationModal;

ConfirmationModal.displayName = 'ConfirmationModal';
