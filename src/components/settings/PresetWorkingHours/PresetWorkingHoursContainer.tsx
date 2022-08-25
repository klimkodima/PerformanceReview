import { memo, ReactElement, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControl,
  Select
} from '@mui/material';

import { ErrorTooltip } from 'src/components/common';
import {
  fetchPresetWorkingHours,
  selectPresetWorkingHours,
  postPresetWorkingHours,
  putPresetWorkingHours,
  deletePresetWorkingHours
} from 'src/store/PresetWorkingHours';
import {
  HEADER_CELLS,
  ERROR_TEXTS,
  MODAL_ERROR_TEXTS,
  OPTIONS_TEXTS,
  HOURS_PER_DAY
} from './constants';
import { PresetWorkingHoursModal } from './PresetWorkingHoursModal';
import { SettingsTableBtnsBlock } from '../common';
import { handleCheckboxClick, onChangeInput } from '../common/helpers';

import { PresetWorkingHoursDataType } from 'src/store/PresetWorkingHours/types';

type UsersContainerPropsType = {
  isEditable: boolean;
};

const UsersContainer = memo(
  ({ isEditable }: UsersContainerPropsType): ReactElement => {
    const rowsApi = useSelector(selectPresetWorkingHours);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPresetWorkingHours());
    }, []);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isValid, setIsValid] = useState(false);
    const copyRowsApi: PresetWorkingHoursDataType[] = JSON.parse(
      JSON.stringify(rowsApi)
    );

    const [rowsState, setRowsState] =
      useState<PresetWorkingHoursDataType[]>(copyRowsApi);

    useEffect(() => {
      setRowsState(copyRowsApi);
    }, [rowsApi]);

    const [selected, setSelected] = useState<string[]>([]);
    const rows = isEdit ? rowsState : copyRowsApi;
    const editClassName = isEdit ? 'settings-table__edit' : '';
    const {
      emptyValueError,
      uniqueLabelError,
      hoursPatternError,
      hoursValueError
    } = ERROR_TEXTS;
    const emptyRow = {
      id: nanoid(),
      label: {
        value: 'Audits',
        isError: false,
        errorText: ''
      },
      time: {
        value: '',
        isError: false,
        errorText: ''
      }
    };
    const { optionValue1, optionValue2, optionValue3 } = OPTIONS_TEXTS;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {
      exceedsValueNotification,
      lessValueNotification,
      emptyValueNotification
    } = MODAL_ERROR_TEXTS;
    const [isLess, setIsLess] = useState<boolean>(false);
    const [isEmptyTable, setIsEmptyTable] = useState<boolean>(false);
    let modalNotification = isLess
      ? lessValueNotification
      : exceedsValueNotification;
    if (isEmptyTable) modalNotification = emptyValueNotification;

    const addNewRow = (): void => {
      setRowsState([...rowsState, emptyRow]);
    };

    const checkValidation = (): void => {
      // !unique status
      const statusNames: string[] = [];
      rowsState.forEach((row: PresetWorkingHoursDataType) =>
        statusNames.push(row.label.value.trim().toLowerCase())
      );
      const uniqueStatusNames = new Set(statusNames);
      let notUniqueStatus: string[] = [];

      if (uniqueStatusNames.size < statusNames.length) {
        const countStatusValues = statusNames.reduce((acc, item) => {
          acc[item] = acc[item] ? Number(acc[item]) + 1 : 1;
          return acc;
        }, {});

        notUniqueStatus = Object.keys(countStatusValues).filter(
          (item: string) => countStatusValues[item] > 1
        );
      }

      const newRows = rowsState.map(
        (row: PresetWorkingHoursDataType): PresetWorkingHoursDataType => {
          if (notUniqueStatus.length === 0) {
            row.label.isError = false;
          }

          const slicedRow = Object.keys(row).slice(1);
          for (const cell of slicedRow) {
            if (row[cell].value.length === 0) {
              row[cell].isError = true;
              row[cell].errorText = emptyValueError;
            }
          }

          // !unique status
          if (notUniqueStatus.length !== 0) {
            for (const cell of notUniqueStatus) {
              if (row.label.value.trim().toLowerCase() === cell) {
                row.label.isError = true;
                row.label.errorText = uniqueLabelError;
              }
            }
          }

          const time = row.time.value;
          if (!/^[\d]{1}[.][\d]{1,2}$/.test(time) && time.length) {
            row.time.isError = true;
            row.time.errorText = hoursPatternError;
          }
          if (/^[\d]{1,5}$/.test(time)) {
            row.time.isError = false;
            row.time.errorText = '';
          }
          if (
            /^[\d]{1}[.][\d]{1,2}$/.test(time) &&
            !Number.isInteger((Number(time) * 100) / 25)
          ) {
            row.time.isError = true;
            row.time.errorText = hoursValueError;
          }

          return row;
        }
      );

      setRowsState(newRows);

      let errCount = 0;
      newRows.forEach((row): void => {
        const slicedRow = Object.keys(row).slice(1);
        for (const cell of slicedRow) {
          if (row[cell].isError) {
            errCount += 1;
          }
        }
      });

      if (errCount === 0) {
        let sum = 0;
        newRows.forEach(({ time }): void => {
          sum += Number(time.value) * 100;
        });

        if (sum / 100 < HOURS_PER_DAY) {
          setIsLess(true);
          setIsEmptyTable(false);
          setIsModalOpen(true);
        } else if (sum / 100 > HOURS_PER_DAY) {
          setIsLess(false);
          setIsEmptyTable(false);
          setIsModalOpen(true);
        } else setIsValid(true);
      }

      if (isEmpty(newRows)) {
        setIsEmptyTable(true);
        setIsModalOpen(true);
      }
    };

    const handleModalCloseClick = (): void => {
      setIsModalOpen(false);
    };

    const handleModalSaveClick = (): void => {
      setIsValid(true);
      setIsModalOpen(false);
    };

    useEffect(() => {
      if (isValid) {
        const rowStateLabels: string[] = [];

        rowsState.forEach((user: PresetWorkingHoursDataType): void => {
          const label: string = user.label.value;
          const time: number = Number(user.time.value) * 3600;
          const rowsApiLabels: string[] = [];

          rowStateLabels.push(label);

          for (const key of rowsApi) {
            rowsApiLabels.push(key.label.value);
            if (
              key.label.value === label &&
              key.time.value !== user.time.value
            ) {
              dispatch(putPresetWorkingHours({ label, time }));
            }
          }

          if (!rowsApiLabels.includes(label)) {
            dispatch(postPresetWorkingHours({ label, time }));
          }
        });

        for (const key of rowsApi) {
          const label = key.label.value;
          if (!rowStateLabels.includes(label)) {
            dispatch(deletePresetWorkingHours(label));
          }
        }

        setIsEdit(false);
        setIsValid(false);
      }
    }, [isValid]);

    return (
      <div className='settings-table'>
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
                {rows.map(({ id, label, time }) => (
                  <TableRow key={id}>
                    {isEdit && (
                      <TableCell>
                        <Checkbox
                          className='edit__checkbox'
                          inputProps={{ 'aria-label': 'checkbox' }}
                          color='error'
                          onClick={() =>
                            handleCheckboxClick(id, selected, setSelected)
                          }
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      {isEdit && (
                        <>
                          <FormControl fullWidth>
                            <Select
                              className={label.isError ? 'error-input' : ''}
                              native
                              defaultValue={label.value}
                              id='grouped-native-select'
                              name='label'
                              onChange={(e) =>
                                onChangeInput(e, id, rowsState, setRowsState)
                              }
                            >
                              <option value={optionValue1}>
                                {optionValue1}
                              </option>
                              <option value={optionValue2}>
                                {optionValue2}
                              </option>
                              <option value={optionValue3}>
                                {optionValue3}
                              </option>
                            </Select>
                          </FormControl>
                          {label.isError && (
                            <ErrorTooltip title={label.errorText} />
                          )}
                        </>
                      )}
                      {!isEdit && label.value}
                    </TableCell>
                    <TableCell>
                      {isEdit && (
                        <>
                          <input
                            className={time.isError ? 'error-input' : ''}
                            type='text'
                            value={time.value}
                            autoComplete='off'
                            name='time'
                            onChange={(e) =>
                              onChangeInput(e, id, rowsState, setRowsState)
                            }
                          />
                          {time.isError && (
                            <ErrorTooltip title={time.errorText} />
                          )}
                        </>
                      )}
                      {!isEdit && time.value}
                    </TableCell>
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
              rowsState={rowsState}
              selected={selected}
              setRowsState={setRowsState}
              rowsApi={copyRowsApi}
              checkValidation={checkValidation}
            />
          )}
        </div>
        {isModalOpen && (
          <PresetWorkingHoursModal
            onClose={handleModalCloseClick}
            modalNotification={modalNotification}
            onSave={handleModalSaveClick}
            isEmptyTable={isEmptyTable}
          />
        )}
      </div>
    );
  }
);

export default UsersContainer;

UsersContainer.displayName = 'UsersContainer';
