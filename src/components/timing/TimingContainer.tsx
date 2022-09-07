import { ReactElement } from 'react';

import { useFormik, FormikProps } from 'formik';
import { t } from 'i18next';
import * as Yup from 'yup';

import { postActivity } from '../../api';
import Timing from './Timing';
import { formatDate } from './helper';

export interface TimingValues {
  name: string;
  timeSpend: number;
  comment: string;
  date: string;
}

export const initialValues = {
  name: 'Audits',
  timeSpend: 0,
  comment: '',
  date: formatDate(new Date())
};

export const validationSchema = Yup.object().shape({
  timeSpend: Yup.number()
    .min(0, t('timing.time_min_error'))
    .max(8, t('timing.time_max_error'))
    .required(t('timing.time_required_error'))
});

const TimingContainer = (): ReactElement => {
  const handleSubmit = (values) => {
    postActivity(values);
  };

  const formik: FormikProps<TimingValues> = useFormik<TimingValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  return <Timing formik={formik} />;
};

export default TimingContainer;
