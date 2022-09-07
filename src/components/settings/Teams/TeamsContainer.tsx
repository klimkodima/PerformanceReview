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
import {
  fetchTeams,
  selectTeams,
  createNewTeamRow,
  deleteTeamRow,
  updateTeamRow
} from 'src/store/Teams';

import { selectUsers } from 'src/store/Users';

import { ErrorTooltip } from 'src/components/common';
import { ERRORS_TEXT, HEADER_CELLS } from './constants';
import { SettingsTableBtnsBlock } from '../common';
import { handleCheckboxClick, onChangeInput } from '../common/helpers';

import { TeamType, TeamInputType, TeamInfoType } from 'src/store/Teams/types';

import '../common/SettingsTableShared.scss';
import './Teams.scss';

const NEW_ROW_ID = 'new-row';

const checkboxHandler =
  (id: string, selected: string[], setSelected: (arg: string[]) => void) =>
  () => {
    handleCheckboxClick(id, selected, setSelected);
  };

const onChangeHandler =
  (id: string, rowsData: TeamType[], setTeamsData: (arg: TeamType[]) => void) =>
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeInput(event, id, rowsData, setTeamsData);
  };

const createRowData = (data: TeamType): TeamInputType => ({
  teamName: data.teamName.value,
  teamLeaderName: data.teamLeaderName.value
});

const updatedTeamData = (data: TeamType): TeamInfoType => ({
  id: data.id,
  teamName: data.teamName.value,
  teamLeaderName: data.teamLeaderName.value
});

type TeamsPropsType = {
  isEditable: boolean;
};

const TeamsContainer = memo(({ isEditable }: TeamsPropsType): ReactElement => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const rowsApi = useSelector(selectTeams);
  useEffect(() => {
    dispatch(fetchTeams());
  }, []);
  const copyTeamsData: TeamType[] = JSON.parse(JSON.stringify(rowsApi));

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [teamsData, setTeamsData] = useState<TeamType[]>(rowsApi);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedForDelete, setSelectedForDelete] =
    useState<string[]>(selected);
  const [isValid, setIsValid] = useState(false);
  const rowsData = isEdit ? teamsData : copyTeamsData;
  const editClassName = isEdit ? 'settings-table__edit' : '';
  const { emptyField } = ERRORS_TEXT;

  useEffect(() => {
    if (selected.length !== 0) {
      setSelectedForDelete(selected);
    }
  }, [selected]);

  useEffect(() => {
    setTeamsData(copyTeamsData);
  }, [isEdit]);

  const addNewRow = () => {
    const newRow = {
      id: nanoid() + NEW_ROW_ID,
      teamName: {
        value: '',
        isError: false,
        errorText: ''
      },
      teamLeaderName: {
        value: '',
        isError: false,
        errorText: ''
      }
    };

    setTeamsData([...teamsData, newRow]);
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

    const teamsDataCopy: TeamType[] = JSON.parse(JSON.stringify(teamsData));

    const newRows = teamsDataCopy.map((row: TeamType): TeamType => {
      const noIdRow = Object.keys(row).slice(1);
      for (const cell of noIdRow) {
        if (!row[cell].value) {
          setError(row[cell], emptyField);
        } else if (errorsCounter === 0) {
          clearError(row[cell]);
        }
      }
      return row;
    });
    setTeamsData(newRows);

    newRows.forEach((row: TeamType): void => {
      if (row.id.endsWith(NEW_ROW_ID) && !row.teamName.isError) {
        dispatch(createNewTeamRow(createRowData(row)));
      }
    });

    copyTeamsData.forEach(
      ({ teamName, teamLeaderName }: TeamType, index: number): void => {
        if (!newRows[index]) return;

        if (
          teamName.value !== newRows[index].teamName.value ||
          teamLeaderName.value !== newRows[index].teamLeaderName.value
        ) {
          if (!newRows[index].teamName.isError) {
            dispatch(updateTeamRow(updatedTeamData(newRows[index])));
          }
        }
      }
    );

    if (selectedForDelete.length > 0) {
      selectedForDelete.forEach((rowId) => {
        if (!rowId.endsWith(NEW_ROW_ID)) {
          dispatch(deleteTeamRow(rowId));
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
    <div className='settings-table teams'>
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
              {rowsData.map(({ id, teamName, teamLeaderName }) => (
                <TableRow key={id}>
                  {isEdit && (
                    <TableCell>
                      <Checkbox
                        className='edit__checkbox'
                        inputProps={{ 'aria-label': 'checkbox' }}
                        color='error'
                        onClick={checkboxHandler(id, selected, setSelected)}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    {isEdit ? (
                      <div className='teams__field-wrapper'>
                        <input
                          className={teamName.isError ? 'error-input' : ''}
                          type='text'
                          value={teamName.value}
                          autoComplete='off'
                          name='teamName'
                          onChange={onChangeHandler(id, rowsData, setTeamsData)}
                        />
                        {teamName.isError && (
                          <div className='error-icon'>
                            <ErrorTooltip title={teamName.errorText} />
                          </div>
                        )}
                      </div>
                    ) : (
                      teamName.value
                    )}
                  </TableCell>
                  <TableCell>
                    {isEdit ? (
                      <div className='teams__field-wrapper'>
                        <input
                          list='users'
                          value={teamLeaderName.value}
                          autoComplete='off'
                          name='teamLeaderName'
                          onChange={onChangeHandler(id, rowsData, setTeamsData)}
                        />
                        <datalist id='users'>
                          {users.map((user) => (
                            <option key={user.id} value={user.username} />
                          ))}
                        </datalist>
                      </div>
                    ) : (
                      teamLeaderName.value
                    )}
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
            rowsState={teamsData}
            selected={selected}
            setRowsState={setTeamsData}
            rowsApi={copyTeamsData}
            checkValidation={checkValid}
          />
        )}
      </div>
    </div>
  );
});

export default TeamsContainer;

TeamsContainer.displayName = 'TeamsContainer';
