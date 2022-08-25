import { ReactElement, ChangeEvent } from 'react';

import './Switch.scss';

type SwitchPropsType = {
  enabledText: string;
  disabledText: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
};

const Switch = ({
  checked,
  enabledText,
  disabledText,
  onChange,
  isDisabled
}: SwitchPropsType): ReactElement => (
  <div className='switch-wrapper-external'>
    <p className={!checked ? 'disabled' : ''}>{enabledText}</p>
    <label
      className={isDisabled ? 'disabled-switch' : ''}
      data-testid='switch-label-test'
    >
      <input
        type='checkbox'
        checked={!checked}
        onChange={onChange}
        disabled={isDisabled}
        name='switch'
      />
      <span className='switch' />
    </label>
    <p className={checked ? 'disabled' : ''}>{disabledText}</p>
  </div>
);

export default Switch;
