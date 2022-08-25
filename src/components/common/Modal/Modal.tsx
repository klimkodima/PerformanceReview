import { FC, ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import './Modal.scss';

type ModalPropsType = {
  isShowFooterButtons: boolean;
  onCloseClick?: () => void;
  onSaveClick?: () => void;
  saveButtonText?: string;
  closeButtonText?: string;
  className?: string;
  isShowSaveButton?: boolean;
  isDisabledSaveButton?: boolean;
};

const Modal: FC<ModalPropsType> = ({
  children,
  isShowFooterButtons,
  onCloseClick,
  closeButtonText,
  saveButtonText,
  onSaveClick,
  isShowSaveButton = true,
  className,
  isDisabledSaveButton = false
}): ReactElement =>
  ReactDOM.createPortal(
    <div className='modal-overlay' data-testid='modal-overlay'>
      <div className={`modal-body ${className ? className : ''}`}>
        {children}
        {isShowFooterButtons && (
          <div className='modal-overlay__buttons'>
            {isShowSaveButton && (
              <Button
                disabled={isDisabledSaveButton}
                variant='outlined'
                color='success'
                startIcon={<CheckIcon />}
                onClick={onSaveClick}
              >
                {saveButtonText}
              </Button>
            )}
            <Button
              variant='outlined'
              color='error'
              startIcon={<CloseIcon />}
              onClick={onCloseClick}
            >
              {closeButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );

export default Modal;
