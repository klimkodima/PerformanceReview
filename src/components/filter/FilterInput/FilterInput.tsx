import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { TextField } from '@mui/material';

import { searchForAuditors } from 'src/store/Filter/reducer';

import './FilterInput.scss';

const FilterInput = (): ReactElement => {
  const dispatch = useDispatch();

  type InputHandlerType = (value: TargetObject) => void;

  type TargetObject = {
    target: {
      value: string;
    };
  };

  const changeHandler: InputHandlerType = ({ target: { value } }) =>
    dispatch(searchForAuditors(value));

  return (
    <div className='filter-input'>
      <TextField
        className='text-field'
        fullWidth
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};

export default FilterInput;
