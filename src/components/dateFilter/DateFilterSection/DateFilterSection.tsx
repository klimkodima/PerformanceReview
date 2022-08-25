import { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

import { selectCurrentUser } from 'src/store/Auth';
import { AUDIT_TITLE, ROLE_NAME } from 'src/constants';
import { createPDF } from 'src/utils/pdfCreator';
import { DateFilterComponent } from '../DateFilterComponent';

import '../dateFilterSection.scss';

const DateFilterSection = (): ReactElement => {
  const { roleName } = useSelector(selectCurrentUser);

  const handlePrintIconClick = (): void => {
    createPDF();
  };

  return (
    <div className='datefilter-container' data-testid='datefilter-container'>
      <h2 className='datefilter-container__header'>
        {roleName === ROLE_NAME.AUDITOR && AUDIT_TITLE}
      </h2>
      <div>
        <IconButton
          className='print-icon'
          data-testid='print-icon'
          onClick={handlePrintIconClick}
        >
          <PrintIcon />
        </IconButton>
        <DateFilterComponent />
      </div>
    </div>
  );
};

export default DateFilterSection;

DateFilterSection.displayName = 'DateFilterSection';
