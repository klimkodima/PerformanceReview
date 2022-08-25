import { ChangeEvent, FormEvent, memo, ReactElement } from 'react';
import { t } from 'i18next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import './Timing.scss';

const names = [
  {
    value: 'Audits',
    label: t('timing.audits_label')
  },
  {
    value: 'Meetings',
    label: t('timing.meetings_label')
  },
  {
    value: 'Support',
    label: t('timing.support_label')
  },
  {
    value: 'Others',
    label: t('timing.others_label')
  },
];

const Timing = memo(({ formik }: any): ReactElement => {

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleReset
  } = formik;

  const timeSpendError = Boolean(formik.errors.timeSpend);

  return (
    <div className='timing'>
      <h2 className='timing__header'>{t('timing.timing_title_text')}</h2>
      <form onSubmit={handleSubmit} className='timing-form'>
        <Stack spacing={3}>
          <TextField
            className='timing-form__input timing-form-input'
            select
            name="name"
            label={t('timing.timing_select_label_text')}
            value={values.name}
            onChange={handleChange}
            helperText={t('timing.timing_select_helper_text')}
          >
            {names.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className='timing-form__input timing-form-input'
            type="number"
            error={timeSpendError}
            name="timeSpend"
            label={t('timing.timing_time_label_text')}
            value={values.timeSpend}
            onChange={handleChange}
            helperText={timeSpendError ? errors.timeSpend :
              t('timing.timing_time_helper_text')}
          />
          <TextField
            className='timing-form__input timing-form-input'
            label={t('timing.timing_comment_label_text')}
            multiline
            name="comment"
            maxRows={4}
            value={values.comment}
            onChange={handleChange}
            helperText={t('timing.timing_comment_helper_text')}
          />
          <TextField
            type="date"
            name="date"
            label={t('timing.timing_date_label_text')}
            value={values.date}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            helperText={t('timing.timing_date_helper_text')}
          />
          <Button
            className='timing-form__button'
            type='submit'
            variant='contained'
            disabled={timeSpendError}
          >
            {t('timing.timing_submit_button_text')}
          </Button>
          <Button
            className='timing-form__button'
            type='reset'
            variant='contained'
            disabled={timeSpendError}
          >
            {t('timing.timing_cancel_button_text')}
          </Button>
        </Stack>
      </form>
    </div>
  )
}
);

export default Timing;

Timing.displayName = 'Timing';
