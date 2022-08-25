import { ReactElement } from 'react';

import { useDispatch } from 'react-redux';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

import {
  filterByTeam,
  filterByLevel,
  filterByAuditor,
  checkResetEnabled
} from 'src/store/Filter';
import { createFormattedString } from 'src/utils';
import { FILTERS_NAMES } from '../data';
import { isDisabled, isChecked } from '../helpers/functions';

import { FilterType } from '../types';

import './FilterOptionCheckbox.scss';

const FilterOptionCheckbox = ({
  name,
  group,
  filteredData,
  checkedItems
}: FilterType): ReactElement => {
  const dispatch = useDispatch();

  const changeHandler = ({ target: { name, value } }) => {
    switch (value) {
      case FILTERS_NAMES.TEAM:
        dispatch(filterByTeam(name as string));
        break;
      case FILTERS_NAMES.LEVEL:
        dispatch(filterByLevel(name as string));
        break;
      case FILTERS_NAMES.AUDITOR:
        dispatch(filterByAuditor(name as string));
        break;
      default:
        break;
    }
    dispatch(checkResetEnabled());
  };

  const labelText =
    group === FILTERS_NAMES.LEVEL ? createFormattedString(name) : name;

  return (
    <FormGroup className='filter-checkbox-wrapper'>
      <FormControlLabel
        control={
          <Checkbox
            data-testid='filter-option-checkbox'
            className='checkbox'
            id={`filter-option-checkbox-${name}`}
            checked={isChecked(checkedItems, name)}
            name={name}
            onChange={(e) => changeHandler(e)}
            value={group}
            disabled={isDisabled(filteredData, name)}
          />
        }
        label={labelText}
      />
    </FormGroup>
  );
};

export default FilterOptionCheckbox;
