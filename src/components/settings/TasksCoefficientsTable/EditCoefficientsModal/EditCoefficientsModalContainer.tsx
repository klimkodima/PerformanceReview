import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useMemo,
  useCallback,
  useState
} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'src/components/common';
import {
  selectCurrentEditData,
  selectEditFormValues,
  selectTaskCoefficientsData,
  selectWebsitesData,
  setFormCurrentCoefficient,
  updateTaskCoefficient,
  WebsiteGroupType
} from 'src/store/TasksCoeff';
import EditCoefficientsModal from './EditCoefficientsModal';
import { createWebsiteGroupsData } from './helpers';

type EditCoefficientsModalContainerPropsType = {
  onClose: () => void;
};

const EditCoefficientsModalContainer: FC<
  EditCoefficientsModalContainerPropsType
> = ({ onClose }): ReactElement => {
  const dispatch = useDispatch();
  const websitesData = useSelector(selectWebsitesData);
  const taskCoefficientsData = useSelector(selectTaskCoefficientsData);
  const currentEditData = useSelector(selectCurrentEditData);
  const EditFormValues = useSelector(selectEditFormValues);

  const websiteGroupsData = useMemo(
    (): WebsiteGroupType[] =>
      createWebsiteGroupsData(websitesData, taskCoefficientsData),
    [websitesData, taskCoefficientsData]
  );

  const initialCoefficientValue = currentEditData.websiteCoefficient
    ? currentEditData.websiteCoefficient
    : currentEditData.groupCoefficient;

  const [isWebsiteGroupsOpen, setIsWebsiteGroupsOpen] = useState<boolean>(true);
  const [coefficientValue, setCoefficientValue] = useState<string | number>(
    initialCoefficientValue
  );
  const [coefficientInputError, setCoefficientInputError] = useState<
    null | string
  >(null);

  const isSaveButtonDisabled =
    coefficientInputError !== null || EditFormValues.websiteGroups.length === 0;

  const handleWebsiteGroupsArrowClick = useCallback(() => {
    setIsWebsiteGroupsOpen(!isWebsiteGroupsOpen);
  }, [isWebsiteGroupsOpen]);
  const handleCoefficientChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCoefficientValue(value);
    },
    []
  );
  const handleCoefficientErrors = useCallback(() => {
    if (
      Number(coefficientValue) === 0 ||
      Number(coefficientValue) < 0 ||
      coefficientValue === ''
    ) {
      setCoefficientInputError('error');
    } else {
      setCoefficientInputError(null);
    }
  }, [coefficientValue]);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleCoefficientErrors();
      if (coefficientInputError === null) {
        dispatch(setFormCurrentCoefficient(Number(coefficientValue)));
        dispatch(updateTaskCoefficient());
        onClose();
      }
    },
    [coefficientInputError, coefficientValue]
  );

  return (
    <Modal isShowFooterButtons={false} className='coefficients-modal'>
      <EditCoefficientsModal
        isWebsiteGroupsOpen={isWebsiteGroupsOpen}
        onWebsiteGroupsArrowClick={handleWebsiteGroupsArrowClick}
        onClose={onClose}
        isSaveButtonDisabled={isSaveButtonDisabled}
        websiteGroupsData={websiteGroupsData}
        currentEditData={currentEditData}
        onFormSubmit={handleFormSubmit}
        coefficientValue={coefficientValue}
        onCoefficientChange={handleCoefficientChange}
        coefficientInputError={coefficientInputError}
        handleCoefficientErrors={handleCoefficientErrors}
      />
    </Modal>
  );
};

export default EditCoefficientsModalContainer;
