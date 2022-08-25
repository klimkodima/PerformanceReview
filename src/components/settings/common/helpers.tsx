import { ChangeEvent } from 'react';

import { SelectChangeEvent } from '@mui/material/Select';

export const handleCheckboxClick = (
  name: string,
  selected: string[],
  setSelected: (arg: string[]) => void
): void => {
  const selectedIndex = selected.indexOf(name);

  if (selectedIndex === -1) {
    setSelected([...selected, name]);
  } else {
    const newSelected = selected.filter(
      (item: string): boolean => item !== name
    );
    setSelected(newSelected);
  }
};

export const receiveNewRow = <Type extends { id: string }>(
  name: string,
  value: string,
  idRow: string,
  rowsState: Type[]
): Type[] => {
  return rowsState.map((row: Type): Type => {
    if (row.id === idRow) {
      return {
        ...row,
        [name]: {
          value,
          isError: false
        }
      };
    }
    return row;
  });
};

export const onChangeInput = <Type extends { id: string }>(
  e:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent<string>,
  idRow: string,
  rowsState: Type[],
  setRowsState: (arg: Type[]) => void
): void => {
  const { value, name } = e.target;

  const newRows = receiveNewRow(name, value, idRow, rowsState);

  setRowsState(newRows);
};

export const checkValidObj = <Type extends object>(
  newRows: Type[],
  setIsValid: (arg: boolean) => void
): void => {
  let errCount = 0;
  newRows.forEach((row): void => {
    const slicedRow = Object.keys(row).slice(1);
    for (const cell of slicedRow) {
      if (row[cell].isError) {
        errCount += 1;
      }
    }
  });

  if (errCount === 0) setIsValid(true);
};
