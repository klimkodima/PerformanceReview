import { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import DatePicker, { DateObject } from 'react-multi-date-picker';

import { setDateFilter } from 'src/store/DateFilter';
import AsideButtonsGroup from '../AsideButtons/AsideButtons';
import { formatDate } from '../helper';

import { dateFilterValueType } from '../types';

const DateFilterComponent = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = useState<dateFilterValueType>([
    new DateObject().subtract(1, 'month'),
    new DateObject()
  ]);

  useEffect(() => {
    const dateArray: number[] = JSON.parse(JSON.stringify(value));
    if (dateArray.length < 2) {
      return;
    }
    const [startDate, finishDate] = [...dateArray];

    dispatch(
      setDateFilter({
        startDate: formatDate(new Date(startDate)),
        finishDate: formatDate(new Date(finishDate))
      })
    );
  }, [value]);

  return (
    <DatePicker
      render={<InputIcon />}
      value={value}
      onChange={setValue}
      range
      numberOfMonths={2}
      format={t('date_filter.format_date')}
      maxDate={new Date()}
      plugins={[
        <AsideButtonsGroup
          classes='buttons-container'
          key={1}
          position='left'
          setValue={setValue}
        />
      ]}
    />
  );
};

export default DateFilterComponent;
