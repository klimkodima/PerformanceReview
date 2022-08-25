import { ReactElement, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';

import {
  fetchHoursCor,
  selectHoursCorrespondence
} from 'src/store/HoursCorrespondence';
import { HEADER_CELLS } from './constants';

import '../common/SettingsTableShared.scss';

const HoursCorrespondence = (): ReactElement => {
  const dispatch = useDispatch();
  const rowsApi = useSelector(selectHoursCorrespondence);

  useEffect(() => {
    dispatch(fetchHoursCor());
  }, []);

  return (
    <div className='settings-table'>
      <div className='settings-table__wrapper'>
        <TableContainer component={Paper}>
          <Table aria-label='table'>
            <TableHead>
              <TableRow>
                {HEADER_CELLS.map((item: string) => (
                  <TableCell key={item}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsApi.map(
                ({ id, status, icon, gap, confirmationRate, tooltipText }) => (
                  <TableRow key={id}>
                    <TableCell>{status.value}</TableCell>
                    <TableCell>
                      <img className='icon' src={icon.value} alt='icon' />
                    </TableCell>
                    <TableCell>{`${gap.value
                      .split('-')
                      .join('% - ')}%`}</TableCell>
                    <TableCell>{`${confirmationRate.value}%`}</TableCell>
                    <TableCell>{tooltipText.value}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HoursCorrespondence;
