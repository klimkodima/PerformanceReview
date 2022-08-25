import { ReactElement, memo } from 'react';

import {
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';

import { createFormattedString } from 'src/utils';
import { InfoTooltip, Modal } from 'src/components/common';
import {
  ACTIVATE_BUTTON,
  ADMIN_ROLE,
  AUDITOR_ROLE,
  CANCEL_BUTTON,
  MANAGER_ROLE,
  MODAL_INFO_TOOLTIP_TEXT,
  MODAL_PRESET_TITLE,
  MODAL_SUBTITLE,
  MODAL_TITLE,
  OPTION_1,
  OPTION_2,
  OPTION_3,
  OPTION_4,
  PRESET_WORKING_HOURS_KEY,
  SELECT_LABEL,
  TEAM_LEAD_LEVEL,
  TEAM_LEAD_ROLE
} from '../../constants';
import { onChangePendingUsers } from '../../helpers';

import { UserInfoType } from 'src/store/Users/types';
import { UpdatedPendingUsersType } from '../../types';

type PendingUsersModalPropsType = {
  selectedUsers: UserInfoType[];
  usersSelectedInfo: UpdatedPendingUsersType[];
  setUsersSelectedInfo: (value: UpdatedPendingUsersType[]) => void;
  onCloseClick: () => void;
  onSaveClick: () => void;
  isDisabledSendBtn: boolean;
};

const PendingUsersModal = memo(
  ({
    selectedUsers,
    usersSelectedInfo,
    setUsersSelectedInfo,
    onCloseClick,
    onSaveClick,
    isDisabledSendBtn
  }: PendingUsersModalPropsType): ReactElement => (
    <Modal
      isShowFooterButtons={true}
      className='pending-users-modal'
      saveButtonText={ACTIVATE_BUTTON}
      closeButtonText={CANCEL_BUTTON}
      onCloseClick={onCloseClick}
      onSaveClick={onSaveClick}
      isDisabledSaveButton={isDisabledSendBtn}
    >
      <h2>{MODAL_TITLE}</h2>
      <p>{MODAL_SUBTITLE}</p>
      <div className='pending-users-modal__table-container'>
        <Table aria-label='table'>
          <TableBody>
            {selectedUsers.map(({ id, fullName, email, level, teamName }) => (
              <TableRow key={id}>
                <TableCell>
                  <AccountCircleIcon />
                  {fullName}
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>
                  {level ? createFormattedString(level) : '-'}
                </TableCell>
                <TableCell>
                  {teamName ? createFormattedString(teamName) : '-'}
                </TableCell>
                <TableCell className='pending-users-modal__icon-block'>
                  <FormControl fullWidth>
                    {(!level || !teamName) && (
                      <InputLabel id='pending-users-modal-label'>
                        {SELECT_LABEL}
                      </InputLabel>
                    )}
                    <Select
                      data-testid='pending-users-modal-select'
                      native
                      defaultValue={
                        level === TEAM_LEAD_LEVEL
                          ? TEAM_LEAD_ROLE
                          : AUDITOR_ROLE
                      }
                      id='pending-users-modal-label'
                      name='role'
                      label={!level || !teamName ? SELECT_LABEL : ''}
                      onChange={(e) =>
                        onChangePendingUsers(
                          e,
                          id,
                          usersSelectedInfo,
                          setUsersSelectedInfo
                        )
                      }
                    >
                      {(!level || !teamName) && (
                        <option aria-label='None' value='' />
                      )}
                      {(level || teamName) && (
                        <>
                          <option value={AUDITOR_ROLE}>{OPTION_1}</option>
                          <option value={TEAM_LEAD_ROLE}>{OPTION_2}</option>
                        </>
                      )}
                      <option value={MANAGER_ROLE}>{OPTION_3}</option>
                      <option value={ADMIN_ROLE}>{OPTION_4}</option>
                    </Select>
                  </FormControl>
                  {(!level || !teamName) && (
                    <InfoTooltip
                      title={MODAL_INFO_TOOLTIP_TEXT}
                      icon={
                        <InfoIcon
                          className='criteria-item__icon'
                          color='primary'
                          data-testid='criteria-item-info-icon'
                        />
                      }
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    data-testid='pending-users-modal-checkbox'
                    inputProps={{ 'aria-label': 'checkbox' }}
                    color='success'
                    name={PRESET_WORKING_HOURS_KEY}
                    onChange={(e) =>
                      onChangePendingUsers(
                        e,
                        id,
                        usersSelectedInfo,
                        setUsersSelectedInfo
                      )
                    }
                  />
                  {MODAL_PRESET_TITLE}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Modal>
  )
);

export default PendingUsersModal;

PendingUsersModal.displayName = 'PendingUsersModal';
