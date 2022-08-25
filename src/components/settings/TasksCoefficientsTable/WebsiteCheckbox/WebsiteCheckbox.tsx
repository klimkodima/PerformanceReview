import { ChangeEvent, memo, ReactElement } from 'react';

import { Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import './WebsiteCheckbox.scss';

type CustomCheckboxPropsType = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const WebsiteCheckbox = memo(
  ({ checked, onChange }: CustomCheckboxPropsType): ReactElement => (
    <Checkbox
      className='custom-checkbox'
      data-testid='custom-checkbox'
      checked={checked}
      onChange={onChange}
      checkedIcon={
        <>
          <CheckBoxOutlineBlankIcon />
          <CheckIcon className='custom-checkbox__check-icon' />
        </>
      }
    />
  )
);

export default WebsiteCheckbox;

WebsiteCheckbox.displayName = 'WebsiteCheckbox';
