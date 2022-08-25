import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonGroup } from '@mui/material';

import { setDatePeriod } from '../helper';

import { AsideButtonsGroupType } from '../types';

const AsideButtonsGroup: FC<AsideButtonsGroupType> = ({
  classes,
  setValue
}: AsideButtonsGroupType): ReactElement => {
  const { t } = useTranslation();
  return (
    <ButtonGroup className={classes} data-testid='buttons-container'>
      <Button className='button' onClick={() => setDatePeriod(30, setValue)}>
        {t('date_filter.last_30_days')}
      </Button>
      <Button className='button' onClick={() => setDatePeriod(90, setValue)}>
        {t('date_filter.last_90_days')}
      </Button>
      <Button className='button' onClick={() => setDatePeriod(365, setValue)}>
        {t('date_filter.last_365_days')}
      </Button>
    </ButtonGroup>
  );
};

export default AsideButtonsGroup;
