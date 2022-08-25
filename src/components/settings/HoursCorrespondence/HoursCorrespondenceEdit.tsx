import { ReactElement, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
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
import PercentIcon from '@mui/icons-material/Percent';

import { ErrorTooltip } from 'src/components/common';
import {
  fetchHoursCor,
  postHoursCor,
  selectHoursCorrespondence
} from 'src/store/HoursCorrespondence';
import { HoursCorType } from 'src/store/HoursCorrespondence/types';
import { ERROR_TEXTS, HEADER_CELLS } from './constants';
import { FileLoad } from './FileLoad';
import { SettingsTableBtnsBlock } from '../common';
import {
  checkValidObj,
  handleCheckboxClick,
  onChangeInput
} from '../common/helpers';

import './HoursCorrespondence.scss';
import '../common/SettingsTableShared.scss';

const HoursCorrespondenceEdit = (): ReactElement => {
  const emptyRow: HoursCorType = {
    id: nanoid(),
    status: {
      value: '',
      isError: false,
      errorText: ''
    },
    icon: {
      value: '',
      isError: false,
      errorText: ''
    },
    gap: {
      value: '',
      isError: false,
      errorText: ''
    },
    confirmationRate: {
      value: '',
      isError: false,
      errorText: ''
    },
    tooltipText: {
      value: '',
      isError: false,
      errorText: ''
    }
  };

  const dispatch = useDispatch();

  const rowsApi = useSelector(selectHoursCorrespondence);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const copyRowsApi: HoursCorType[] = JSON.parse(JSON.stringify(rowsApi));
  const [rowsState, setRowsState] = useState<HoursCorType[]>(copyRowsApi);
  const [selected, setSelected] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const rows = isEdit ? rowsState : copyRowsApi;
  const editClassName = isEdit ? 'settings-table__edit' : '';
  const {
    emptyValueError,
    uniqueStatusError,
    confirmationRateError,
    gapMinValueError,
    gapMaxValueError,
    gapCoverError,
    gapPatternError,
    gapMinMaxValueError
  } = ERROR_TEXTS;

  useEffect(() => {
    dispatch(fetchHoursCor());
  }, [isEdit]);

  const addNewRow = (): void => {
    setRowsState([...rowsState, emptyRow]);
  };

  const editHandler = (arg: boolean) => {
    setIsEdit(arg);
    setRowsState(copyRowsApi);
  };

  const checkValidation = (): void => {
    rowsState.sort(
      (a, b) =>
        Number(b.gap.value.split('-')[0]) - Number(a.gap.value.split('-')[0])
    );
    // !unique status
    const statusNames: string[] = [];
    rowsState.forEach((row: HoursCorType) =>
      statusNames.push(row.status.value.trim().toLowerCase())
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
      (row: HoursCorType, index: number): HoursCorType => {
        if (notUniqueStatus.length === 0) {
          row.status.isError = false;
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
            if (row.status.value.trim().toLowerCase() === cell) {
              row.status.isError = true;
              row.status.errorText = uniqueStatusError;
            }
          }
        }
        // !gap
        const [minValue, maxValue] = row.gap.value.split('-');
        if (Number(maxValue) <= Number(minValue)) {
          row.gap.isError = true;
          row.gap.errorText = gapMinMaxValueError;
        }

        const gap = row.gap.value;
        if (!/^[\d]{1,2}-[\d]{1,3}$/.test(gap)) {
          row.gap.isError = true;
          row.gap.errorText = gapPatternError;
        }

        if (index === rowsState.length - 1) {
          const minGap = rowsState[index].gap;
          if (Number(minGap.value.split('-')[0]) !== 1) {
            minGap.isError = true;
            minGap.errorText = gapMinValueError;
          }
        } else if (index === 0) {
          const maxGap = rowsState[0].gap;
          if (Number(maxGap.value.split('-')[1]) !== 100) {
            maxGap.isError = true;
            maxGap.errorText = gapMaxValueError;
          }
        }

        for (let i = 1; i < rowsState.length; i++) {
          const [minValue] = rowsState[i - 1].gap.value.split('-');
          const maxCheckValue = rowsState[i].gap.value.split('-')[1];
          if (index === i - 1) {
            const validationCondition =
              Number(maxCheckValue) === Number(minValue) - 1;
            if (!validationCondition) {
              rowsState[i].gap.isError = true;
              rowsState[i].gap.errorText = gapCoverError;
            } else rowsState[i].gap.isError = false;
          }
        }
        // !confirmationRate
        const confirmationRate = row.confirmationRate.value;
        if (
          Number(confirmationRate) > 100 ||
          Number(confirmationRate) < 1 ||
          !/^[0-9]+$/.test(confirmationRate)
        ) {
          row.confirmationRate.isError = true;
          row.confirmationRate.errorText = confirmationRateError;
        }
        return row;
      }
    );

    setRowsState(newRows);
    checkValidObj(newRows, setIsValid);

    const newRowsForPost = newRows.map((item: HoursCorType) => {
      return {
        status: `${item.status.value}`,
        icon: `${item.icon.value}`,
        intervalStart: Number(item.gap.value.split('-')[0]),
        intervalEnd: Number(item.gap.value.split('-')[1]),
        confirmationRate: Number(item.confirmationRate.value),
        tooltip: item.tooltipText.value
      };
    });

    dispatch(postHoursCor(newRowsForPost));
  };

  useEffect(() => {
    if (isValid) {
      // send data
      setIsEdit(false);
      setIsValid(false);
    }
  }, [isValid]);

  return (
    <div className='hours-correspondence settings-table'>
      <div className='settings-table__wrapper'>
        <TableContainer component={Paper} className={editClassName}>
          <Table aria-label='table'>
            <TableHead>
              <TableRow>
                {isEdit && <TableCell />}
                {HEADER_CELLS.map((item: string) => (
                  <TableCell key={item}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(
                ({ id, status, icon, gap, confirmationRate, tooltipText }) => (
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
                          <input
                            value={status.value}
                            className={status.isError ? 'error-input' : ''}
                            name='status'
                            autoComplete='off'
                            required
                            onChange={(e) =>
                              onChangeInput(e, id, rowsState, setRowsState)
                            }
                            data-testid='status'
                          />
                          {status.isError && (
                            <ErrorTooltip title={status.errorText} />
                          )}
                        </>
                      )}
                      {!isEdit && status.value}
                    </TableCell>

                    <TableCell className='td__file-load file-load'>
                      {isEdit && (
                        <>
                          <FileLoad
                            id={id}
                            rowsState={rowsState}
                            setRowsState={setRowsState}
                            item={icon}
                          />
                          {icon.isError && (
                            <ErrorTooltip title={icon.errorText} />
                          )}
                        </>
                      )}
                      {!isEdit && <img src={icon.value} alt={'icon'} />}
                    </TableCell>

                    <TableCell>
                      {isEdit && (
                        <>
                          <div className='td__input-number'>
                            <input
                              value={gap.value}
                              className={gap.isError ? 'error-input' : ''}
                              name='gap'
                              autoComplete='off'
                              required
                              maxLength={6}
                              placeholder='1-100'
                              onChange={(e) =>
                                onChangeInput(e, id, rowsState, setRowsState)
                              }
                              data-testid='gap'
                            />
                            <PercentIcon />
                          </div>
                          {gap.isError && (
                            <ErrorTooltip title={gap.errorText} />
                          )}
                        </>
                      )}
                      {!isEdit && `${gap.value.split('-').join('% - ')}%`}
                    </TableCell>

                    <TableCell>
                      {isEdit && (
                        <>
                          <div className='td__input-number'>
                            <input
                              value={confirmationRate.value}
                              className={
                                confirmationRate.isError ? 'error-input' : ''
                              }
                              name='confirmationRate'
                              autoComplete='off'
                              required
                              maxLength={3}
                              placeholder='number'
                              onChange={(e) =>
                                onChangeInput(e, id, rowsState, setRowsState)
                              }
                              data-testid='confirmationRate'
                            />
                            <PercentIcon />
                          </div>
                          {confirmationRate.isError && (
                            <ErrorTooltip title={confirmationRate.errorText} />
                          )}
                        </>
                      )}
                      {!isEdit && `${confirmationRate.value}%`}
                    </TableCell>

                    <TableCell>
                      {isEdit && (
                        <>
                          <textarea
                            value={tooltipText.value}
                            className={tooltipText.isError ? 'error-input' : ''}
                            name='tooltipText'
                            required
                            rows={4}
                            maxLength={250}
                            minLength={10}
                            onChange={(e) =>
                              onChangeInput(e, id, rowsState, setRowsState)
                            }
                            data-testid='tooltipText'
                          />
                          {tooltipText.isError && (
                            <ErrorTooltip title={tooltipText.errorText} />
                          )}
                        </>
                      )}
                      {!isEdit && tooltipText.value}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <SettingsTableBtnsBlock
          isEdit={isEdit}
          isValid={isValid}
          setIsEdit={editHandler}
          addNewRow={addNewRow}
          setSelected={setSelected}
          rowsState={rowsState}
          selected={selected}
          setRowsState={setRowsState}
          rowsApi={copyRowsApi}
          checkValidation={checkValidation}
        />
      </div>
    </div>
  );
};

export default HoursCorrespondenceEdit;
