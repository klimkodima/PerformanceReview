import { ReactElement } from 'react';

import { Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

import { TABLE_BUTTONS } from '../constants';

type BtnsBlockPropsType<Type> = {
  isEdit: boolean;
  isValid: boolean;
  setIsEdit: (arg: boolean) => void;
  selected: string[];
  setSelected: (arg: string[]) => void;
  addNewRow: () => void;
  rowsState: Type[];
  setRowsState: (arg: Type[]) => void;
  rowsApi: Type[];
  checkValidation: () => void;
};

const SettingsTableBtnsBlock = <Type extends { id: string }>(
  props: BtnsBlockPropsType<Type>
): ReactElement => {
  const {
    isEdit,
    isValid,
    setIsEdit,
    selected,
    setSelected,
    addNewRow,
    rowsState,
    setRowsState,
    rowsApi,
    checkValidation
  } = props;
  const { editBtn, addBtn, deleteBtn, saveBtn, cancelBtn } = TABLE_BUTTONS;
  const isDisabledDelete = selected.length === 0;
  const isDisableSave =
    JSON.stringify(rowsState) === JSON.stringify(rowsApi) && !isValid;

  const handleEditTable = (): void => {
    setIsEdit(!isEdit);
    setSelected([]);
    setRowsState(rowsApi);
  };

  const deleteCheckedRow = (): void => {
    const newRows = rowsState.filter((item) => !selected.includes(item.id));
    setSelected([]);
    setRowsState(newRows);
  };

  return (
    <div className='settings-table__btns-block'>
      <Button
        className='btns-block__edit-btn'
        variant='outlined'
        color='success'
        disabled={isEdit}
        startIcon={<EditIcon />}
        onClick={() => setIsEdit(!isEdit)}
      >
        {editBtn}
      </Button>
      {isEdit && (
        <div className='settings-table__block'>
          <Stack spacing={2} direction='row'>
            <Button
              variant='outlined'
              color='success'
              startIcon={<AddIcon />}
              onClick={addNewRow}
            >
              {addBtn}
            </Button>
            <Button
              variant='outlined'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={deleteCheckedRow}
              disabled={isDisabledDelete}
            >
              {deleteBtn}
            </Button>
          </Stack>
          <Stack spacing={2} direction='row'>
            <Button
              variant='outlined'
              color='success'
              startIcon={<CheckIcon />}
              onClick={checkValidation}
              disabled={isDisableSave}
            >
              {saveBtn}
            </Button>
            <Button
              variant='outlined'
              color='error'
              startIcon={<CloseIcon />}
              onClick={handleEditTable}
            >
              {cancelBtn}
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default SettingsTableBtnsBlock;
