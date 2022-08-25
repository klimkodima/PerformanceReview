import { ChangeEvent, memo, ReactElement, useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import {
  createNewBonusesRow,
  deleteBonusesRow,
  fetchBonusesData,
  selectBonusesData,
  SeniorityBonusType,
  updateBonusesRow
} from 'src/store/SeniorityBonuses';
import { ErrorTooltip, InfoTooltip } from 'src/components/common';
import {
  ERRORS_TEXT,
  EXPERIENCE_KEY,
  HEADER_CELLS,
  INFO_TOOLTIP
} from './constants';
import { SettingsTableBtnsBlock } from '../common';
import { handleCheckboxClick, onChangeInput } from '../common/helpers';

import { BonusesDataType } from 'src/store/SeniorityBonuses';

import '../common/SettingsTableShared.scss';
import './SeniorityBonuses.scss';

const NEW_ROW_ID = 'new-row';

const checkboxHandler =
  (id: string, selected: string[], setSelected: (arg: string[]) => void) =>
  () => {
    handleCheckboxClick(id, selected, setSelected);
  };

const onChangeHandler =
  (
    id: string,
    rowsData: BonusesDataType[],
    setBonusesData: (arg: BonusesDataType[]) => void
  ) =>
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeInput(event, id, rowsData, setBonusesData);
  };

type SeniorityBonusesPropsType = {
  isEditable: boolean;
};

const SeniorityBonusesContainer = memo(
  ({ isEditable }: SeniorityBonusesPropsType): ReactElement => {
    const dispatch = useDispatch();
    const rowsApi = useSelector(selectBonusesData);
    const copyBonusesData: BonusesDataType[] = JSON.parse(
      JSON.stringify(rowsApi)
    );

    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
      dispatch(fetchBonusesData());
    }, []);

    const [bonusesData, setBonusesData] = useState<BonusesDataType[]>(rowsApi);
    const [selected, setSelected] = useState<string[]>([]);
    const [selectedForDelete, setSelectedForDelete] =
      useState<string[]>(selected);
    const [isValid, setIsValid] = useState(false);
    const rowsData = isEdit ? bonusesData : copyBonusesData;
    const editClassName = isEdit ? 'settings-table__edit' : '';
    const { emptyField, wrongPattern, intervalError } = ERRORS_TEXT;

    useEffect(() => {
      if (selected.length !== 0) {
        setSelectedForDelete(selected);
      }
    }, [selected]);

    useEffect(() => {
      setBonusesData(copyBonusesData);
    }, [isEdit]);

    const addNewRow = () => {
      const newRow = {
        id: nanoid() + NEW_ROW_ID,
        experience: {
          value: '',
          isError: false,
          errorText: ''
        },
        bonus: {
          value: '',
          isError: false,
          errorText: ''
        }
      };

      setBonusesData([...bonusesData, newRow]);
    };

    const checkValid = (): void => {
      let errorsCounter = 0;

      const setError = (cell, errorText): void => {
        errorsCounter += 1;
        cell.isError = true;
        cell.errorText = errorText;
        setIsValid(false);
      };

      const clearError = (cell): void => {
        cell.isError = false;
        cell.errorText = '';
        setIsValid(true);
      };

      const bonusesDataCopy: BonusesDataType[] = JSON.parse(
        JSON.stringify(bonusesData)
      );

      const newRows = bonusesDataCopy.map(
        (row: BonusesDataType, index: number): BonusesDataType => {
          const noIdRow = Object.keys(row).slice(1);

          if (
            Number(bonusesDataCopy[index]?.experience?.value) <=
              Number(bonusesDataCopy[index - 1]?.experience?.value) &&
            index !== 0
          ) {
            setError(row.experience, intervalError);
          }

          for (const cell of noIdRow) {
            if (!row[cell].value) {
              setError(row[cell], emptyField);
            } else if (!/^\d+$/.test(row[cell].value as string)) {
              setError(row[cell], wrongPattern);
            } else if (errorsCounter === 0) {
              clearError(row[cell]);
            }
          }

          return row;
        }
      );
      setBonusesData(newRows);

      newRows.forEach((row: BonusesDataType): void => {
        if (
          row.id.endsWith(NEW_ROW_ID) &&
          !row.experience.isError &&
          !row.bonus.isError
        ) {
          dispatch(createNewBonusesRow(row));
        }
      });

      copyBonusesData.forEach(
        ({ experience, bonus }: BonusesDataType, index: number): void => {
          if (!newRows[index]) return;

          if (
            experience.value !== newRows[index].experience.value ||
            bonus.value !== newRows[index].bonus.value
          ) {
            const createRowData = (
              data: BonusesDataType
            ): SeniorityBonusType => ({
              id: Number(data.id),
              startInterval: Number(data.experience.value),
              bonusPercentage: Number(data.bonus.value)
            });

            if (
              !newRows[index].experience.isError &&
              !newRows[index].bonus.isError
            ) {
              dispatch(updateBonusesRow(createRowData(newRows[index])));
            }
          }
        }
      );

      if (selectedForDelete.length > 0) {
        selectedForDelete.forEach((rowId) => {
          if (!rowId.endsWith(NEW_ROW_ID)) {
            dispatch(deleteBonusesRow(rowId));
          }
        });
        setSelectedForDelete([]);
      }

      if (!errorsCounter) {
        setIsEdit(false);
        setSelected([]);
      }
    };

    return (
      <div className='settings-table seniority-bonuses'>
        <div className='settings-table__wrapper'>
          <TableContainer component={Paper} className={editClassName}>
            <Table aria-label='table'>
              <TableHead>
                <TableRow>
                  {isEdit && <TableCell />}
                  {HEADER_CELLS.map((headCell) => (
                    <TableCell key={headCell}>{headCell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsData.map((row) => (
                  <TableRow key={row.id}>
                    {isEdit && (
                      <TableCell>
                        <Checkbox
                          className='edit__checkbox'
                          inputProps={{ 'aria-label': 'checkbox' }}
                          color='error'
                          onClick={checkboxHandler(
                            row.id,
                            selected,
                            setSelected
                          )}
                        />
                      </TableCell>
                    )}
                    {(
                      Object.keys(row) as Array<
                        keyof Omit<BonusesDataType, 'id'>
                      >
                    )
                      .slice(1)
                      .map((cell) => (
                        <TableCell key={cell + row.id}>
                          {isEdit ? (
                            <div className='seniority-bonuses__field-wrapper '>
                              <input
                                className={
                                  row[cell].isError ? 'error-input' : ''
                                }
                                type='text'
                                value={row[cell].value}
                                autoComplete='off'
                                name={cell}
                                onChange={onChangeHandler(
                                  row.id,
                                  rowsData,
                                  setBonusesData
                                )}
                              />
                              {cell === EXPERIENCE_KEY && (
                                <InfoTooltip
                                  title={INFO_TOOLTIP}
                                  icon={
                                    <InfoIcon
                                      className='info-icon'
                                      color='primary'
                                    />
                                  }
                                />
                              )}
                              {row[cell].isError && (
                                <div className='error-icon'>
                                  <ErrorTooltip title={row[cell].errorText} />
                                </div>
                              )}
                            </div>
                          ) : (
                            row[cell].value
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isEditable && (
            <SettingsTableBtnsBlock
              isEdit={isEdit}
              isValid={isValid}
              setIsEdit={setIsEdit}
              addNewRow={addNewRow}
              setSelected={setSelected}
              rowsState={bonusesData}
              selected={selected}
              setRowsState={setBonusesData}
              rowsApi={copyBonusesData}
              checkValidation={checkValid}
            />
          )}
        </div>
      </div>
    );
  }
);

export default SeniorityBonusesContainer;

SeniorityBonusesContainer.displayName = 'SeniorityBonusesContainer';
